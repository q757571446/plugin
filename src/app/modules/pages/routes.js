import Home from './home'
import Canvas from './canvas'
import Socket from './socket'
import Getui from './getui'
import Amap from './amap'

export const routes = [
    { title: 'Home', name: 'home', path: '/home', component: Home },
    { title: 'Canvas', name: 'canvas', path: '/canvas/:caseId', component: Canvas },
    { title: 'Socket', name: 'socket', path: '/socket', component: Socket },
    { title: 'Getui', name: 'getui', path: '/getui', component: Getui },
    { title: 'Amap', name: 'amap', path: '/amap', component: Amap },
]