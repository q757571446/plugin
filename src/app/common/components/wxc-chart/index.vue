<template>
    <gcanvas :ref="container" :style="{width:width,height:height,backgroundColor:backgroundColor}"></gcanvas>
</template>
<script>
import CanvasElement from './canvas-element'
import G2 from './weex-chart'
var GCanvas=require('weex-gcanvas'); 
export default {
  props: {
    container: {
      type: String,
      default: "canvas_holder"
    },
    width: {
      type: Number,
      default: 750
    },
    height: {
      type: Number,
      default: 375
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },
  created() {
    CanvasElement.reset(this.container)
  },
  mounted() {
    CanvasElement.init(this.container,this.$refs[this.container]).then(context => {
        G2.ready(context)
    })
  },
  beforeDestroy() {
    CanvasElement.reset(this.container)
  }
};
</script>
