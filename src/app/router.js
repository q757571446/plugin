import VueRouter from 'vue-router'
import LocationHelper from 'common/tools/location-helper'
import {routes as modules} from './modules'
const Navigator = weex.requireModule('navigator');

const routes = [
    ...modules
].map(route => {
    let {relative} = route.component.__path 
    let absolutePath = LocationHelper.getAbsoluteUrl(weex.config.bundleUrl, relative)
    route.meta = {title: route.title||'', location:absolutePath} 
    return route
})
  
routes.push({path: '/', redirect: {path: '/home'}})

export default function Router(Vue) {
    Vue.use(VueRouter);
    const router = new VueRouter({
        routes: routes
    });
    router.push('/')
    return {
        router
    }
}

