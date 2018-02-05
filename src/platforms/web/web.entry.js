import App from '../../app'
import Config from '../../app/config'
import Router from '../../app/router.js'
import Store from '../../app/store.js';
// weex.install(require("weex-gcanvas").htmlPlugin); web端暂时不支持有bug
import { HttpClient } from 'common/plugins'

const { store } = Store(Vue);
const { router } = Router(Vue);
const { config } = Config(Vue);

new Vue(Vue.util.extend({
  el:'#root',
  router,
  store
},App));