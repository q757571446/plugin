import GCanvas from 'weex-gcanvas'

const INSTANCE_MAP = {}
const CanvasElement = ({container}) => {
    let instance = INSTANCE_MAP[container]
    Object.defineProperties(instance, {
        'currentStyle': {
            get(){
                return Object.assign({}, instance.element.classStyle, instance.element.style);
            }
        },
        'offsetWidth': {
            get () {
                return parseFloat(instance.element.classStyle['width']||instance.element.style['width'])
            }
        },
        'offsetHeight': {
            get () {
                return parseFloat(instance.element.classStyle['height'] || instance.element.style['height'])
            }
        },
    })
    instance.getContext=()=>{
        return instance.context
    }
    return instance
}

CanvasElement.init = (container, element) => {
    let gcanvas = GCanvas.start(element)
    let context = gcanvas.getContext('2d')
    let {style:{width,height}} = element 
    context.clearRect(0, 0, width, height)
    INSTANCE_MAP[container] = {element: element, context: context}
    return Promise.resolve(context)
}

CanvasElement.reset = function () {
    GCanvas.disable();
}

export default CanvasElement