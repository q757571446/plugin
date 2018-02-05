var protocol = location.protocol + '//'
var hostname = typeof CURRENT_IP === 'string' ? CURRENT_IP : location.hostname
var port = location.port ? ':' + location.port : ''
var url = protocol + hostname + port +'/' + location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, getUrlParam('page') || 'index-dev.js')

function getUrlParam(key, searchStr) {
    var reg = new RegExp('[?|&]' + key + '=([^&]+)');
    searchStr = searchStr || location.search;
    var match = searchStr.match(reg)
    return match && match[1]
}