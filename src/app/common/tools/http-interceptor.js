import storage from 'common/tools/storage-helper'

export default function (request, next) {
    storage.getItem('token').then(token => {
        request.headers.set('HTTP_ACCESS_TOKEN', token)
    }).finally(()=>{
        next()
    })
}