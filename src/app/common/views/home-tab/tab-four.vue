<template>
  <list>
    <cell class="item-wrapper" :key="index" v-for="(item,index) in items" @click="openDemo(item)">
      <text class="item-text">{{item.title}}</text>
    </cell>
  </list>
</template>
<script>
export default {
  data() {
    return {
      items: [
        { path: "/socket", title: "Socket" },
        { path: "/getui", title: "Getui" },
        { path: "/amap", title: "Amap" },
      ]
    };
  },
  methods: {
    openDemo({path}) {
		this.$router.push(path)
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
