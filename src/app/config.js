import context from 'environment'
import plugins from 'common/plugins'
import HttpClient from 'common/tools/http-client.js'
import HttpInterceptor from 'common/tools/http-interceptor.js'
import 'common/polyfill'
const domModule = weex.requireModule('dom');

const AppConfig = ({context, plugins}) => {
    configPlugin(plugins)
    configContext(context)
}

const configPlugin = (plugins) => {
    Object.keys(plugins).forEach(key => {
        Vue.use(plugins[key])
    })
}

const configContext = (context) => {
    let {HOST, RULE} = context
    Vue.http.options.root = HOST
    Vue.http.options.client = new HttpClient()
    Vue.http.interceptors.push(HttpInterceptor)
    Object.keys(RULE).forEach(key => {
        domModule.addRule('fontFace', {
            'fontFamily': key,
            'src':`url('${RULE[key]}')` 
        })
    })
}

export default function Config(Vue) {
    return {
        config: new AppConfig({
            context:context,
            plugins:plugins
        })
    }
}

