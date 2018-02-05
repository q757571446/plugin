<template>
    <wxc-tab-bar 
    :tab-titles="tabTitles"
    :tab-styles="tabStyles"
    title-type="icon"
    :nav-height="navHeight"
    @wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
    <tab-one class="item-container" :style="contentStyle"></tab-one>
    <tab-two class="item-container" :style="contentStyle"></tab-two>
    <tab-three class="item-container" :style="contentStyle"></tab-three>
    <tab-four class="item-container" :style="contentStyle"></tab-four>
  </wxc-tab-bar>
</template>

<style scoped>
.item-container {
  width: 750px;
  background-color: white;
}
</style>
<script>
const dom = weex.requireModule("dom");
import Config from "./config";
import { Utils, WxcTabPage, WxcPanItem } from "weex-ui";
import { getNavHeight, getPageHeight } from "common/tools/screen-helper";
import { WxcTabBar } from "common/components";
import { TabOne, TabTwo, TabThree, TabFour } from "common/views/home-tab";
export default {
  components: {
    WxcTabBar,
    WxcTabPage,
    WxcPanItem,
    TabOne,
    TabTwo,
    TabThree,
    TabFour
  },
  data: () => ({
    tabTitles: Config.tabTitles,
    tabStyles: Config.tabStyles,
    pageTitles: Config.pageTitles,
    pageStyles: Config.pageStyles
  }),
  created() {
    this.navHeight = getNavHeight();
    this.tabPageHeight = getPageHeight();
    const { tabPageHeight, tabStyles } = this;
    this.contentStyle = { height: tabPageHeight - tabStyles.height + "px" };
  },
  methods: {
    openPager() {
      this.$router.push("/login");
    },
    openCanvas() {
      this.$router.push("/canvas");
    },
    wxcTabBarCurrentTabSelected(e) {
      const index = e.page;
      console.log(index);
    }
  }
};
</script>