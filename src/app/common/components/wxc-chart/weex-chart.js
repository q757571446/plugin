import G2 from "library/g2-mobile"
import CanvasElement from './canvas-element'

let _context;
let _ready = false;
let _renderQueue = [];
let _chartRender = G2.Chart.prototype.render;

G2.Chart.prototype.render = function () {
    if(_ready) {
        _chartRender.call(this)
        _context.render();
    }else{
        _renderQueue.push(this);
    }
};

let G2Chart = G2.Chart

G2.Chart = (config) => {
    config.el = new CanvasElement(config)
    return new G2Chart(config)
}
G2.ready = (context) => {
    _ready = true;
    _context = context;
    var chart;
    if (_renderQueue.length > 0) {
        while (chart = _renderQueue.shift()) {
            _chartRender.call(chart);
        }
        context.render();
    }
}

export default G2