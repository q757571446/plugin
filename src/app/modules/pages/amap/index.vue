<template>
  <div >
      <weex-amap style="width: 750px;height:1000px;" id="map2017" :scale="true" :geolocation="true" :center="pos" >
        <weex-amap-marker :position="point.position" :title="point.title"></weex-amap-marker>
      </weex-amap>
  </div>
</template>



<script>
//github->https://github.com/weex-plugins/weex-amap
  module.exports = {
    data(){
        return {
            pos:[116.487, 40.00003],
            point: {
                position: [112,36],
                title: 'this is a marker'
            }
        }
    },
  }
</script>