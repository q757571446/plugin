<template>
  <list>
    <cell class="item-wrapper" :key="index" v-for="(item,index) in items" @click="openCanvasDemo(item)">
      <text class="item-text">{{item.title}}</text>
    </cell>
  </list>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { id: "1", title: "点图" },
        { id: "2", title: "折线图" },
        { id: "3", title: "平滑折线图" },
        { id: "4", title: "带点折线图" },
        { id: "5", title: "区域图" },
        { id: "6", title: "带事件的重叠区域图" },
        { id: "7", title: "柱状图" },
        { id: "8", title: "区间柱状图" },
        { id: "9", title: "层叠柱状图" },
        { id: "10", title: "玉玦图" },
        { id: "11", title: "自定义shape的柱状图" },
        { id: "12", title: "饼图" },
        { id: "13", title: "嵌套饼图" },
        { id: "14", title: "玫瑰饼图" },
        { id: "15", title: "雷达图" },
        { id: "16", title: "带缩放动画的区域雷达图" },
        { id: "17", title: "股票图" },
        { id: "18", title: "双Y轴" },
        { id: "19", title: "其他" },
        { id: "20", title: "环形饼图" },
      ]
    };
  },
  methods: {
    openCanvasDemo({id}) {
      this.$router.push(`/canvas/${id}`)
    }
  }
};
</script>
<style>
.item-wrapper {
  width: 750;
  height: 120;
  justify-content: center;
  border-width: 1px;
  border-color: #f4f4f4;
  padding-left: 20px;
  padding-right: 20px;
}
.item-text {
  font-size: 40px;
  color: #555;
}
</style>
