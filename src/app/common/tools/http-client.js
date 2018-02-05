/**
 * @author kevin
 * 代理vue-resource请求，职责
 * 1. 代理get, delete, head, jsonp, post, put, patch等请求方法
 * 2. 使用android，ios网络请求库处理xhr请求
 */
const stream = weex.requireModule('stream')

const extractData = (response) => {
    return new Promise((resolve, reject) => {
        let {
            status,
            statusText,
            data: {
                code,
                data,
                msg
            }
        } = response
        if (status != 200) {
            reject(response)
        } else if (code != 200) {
            reject(msg)
        } else {
            resolve(data)
        }
    })
}

const handleError = (error) => {
    let errMsg;
    if (error instanceof Object) {
        let status = error.status
        if (status == 401) {
            errMsg = '身份验证未通过，请重新登录'
        } else if (status == 402) {
            errMsg = '无权限查看此页，请联系管理员'
        } else if (status == 404) {
            errMsg = '未找到此页面，请稍后重试'
        } else {
            const body = error.data || '';
            const err = body.msg || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    throw errMsg
}

const client = (_request) => {
    return new Promise(resolve => {
        let headers = {}
        _request.headers.forEach((value, name) => {
            headers[name] = value
        })
        stream.fetch({
            type: 'json',
            url: _request.getUrl(),
            headers: headers,
            method: _request.method,
            body: _request.getBody()
        }, (response) => {
            resolve(response)
        })
    })
}

export default function() {
    ['get', 'delete', 'head', 'jsonp'].forEach(method => {
        let _method = Vue.http[method]
        Vue.http[method] =function(url, options) {
            return _method.call(this, url, options.then(response => {
                return extractData(response)
            }).catch(err => {
                return handleError(err)
            }))
        }
    });
    ['post', 'put', 'patch'].forEach(method => {
        
        let _method = Vue.http[method]
        Vue.http[method] = function(url, body, options) {
            return _method.call(this, url, body, options).then(response => {
                return extractData(response)
            }).catch(err => {
                return handleError(err)
            })
        }
    });
    return client
}