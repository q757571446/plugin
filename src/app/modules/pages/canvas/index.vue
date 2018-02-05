<template>
    <div>
      <text style="width:750;height:100;backgroundColor:#e0e0e0">canvas_demo 上边界</text>
      <wxc-chart container="c1" width="750" height="400" background-color="##000000"></wxc-chart>
      <text style="width:750;height:100;backgroundColor:#e0e0e0">canvas_demo 下边界</text>
    </div>
</template>
<script>
import { G2, WxcChart } from 'common/components'
import cases from './case.js'
export default {
  components: {
    WxcChart
  },
  computed: {
    caseId() {
      return this.$route.params.caseId || 1
    }
  },
  methods: {
    renderChart() {
      cases[`case${this.caseId}`](G2)
    }
  },
  mounted() {
    this.renderChart()
  }
};
</script>
