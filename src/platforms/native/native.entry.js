import App from '../../app'
import Router from '../../app/router.js'
import Store from '../../app/store.js';
import Config from '../../app/config'
const navigator = weex.requireModule('navigator');

const { store } = Store(Vue);
const { router } = Router(Vue);
const { config } = Config(Vue);

// router.beforeEach(({meta: {location}}, from, next) => {
//     let platform = weex.config.env.platform
//     switch(platform) {
//         case 'Web':
//             next()
//             break;
//         case 'iOS':
//         case 'Android':
//           navigator.push({
//             url: location,
//             animated: "true"
//           })
//           break;
//     }
// })

new Vue(Vue.util.extend({
  el:'#root',
  router,
  store
},App));
