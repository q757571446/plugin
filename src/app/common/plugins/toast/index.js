
const modal = weex.requireModule('modal');

const plugin = {
 install (Vue) {
   Vue.prototype.$modal = modal
   Vue.modal = modal
 },
}

export default plugin
export const install = plugin.install