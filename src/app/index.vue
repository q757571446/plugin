<template>
    <div class="page-wrapper">
        <wxc-minibar 
            ref="title"
            :nav-styles="navStyle"
            :title="$route.meta.title"
            background-color="#009ff0"
            text-color="#FFFFFF"
            right-text="more"
            @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
            @wxcMinibarRightButtonClicked="minibarRightButtonClick">
        </wxc-minibar>
        <wxc-loading :show="loading"></wxc-loading>
        <router-view class="page-wrapper" :style="{top: navHeight}"></router-view>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { WxcMinibar } from "common/components";
import { WxcLoading, Utils } from "weex-ui";
import { getNavHeight, getNavStyle } from "common/tools/screen-helper";
export default {
  components: {
    WxcMinibar,
    WxcLoading
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["loading"])
  },
  created() {
    this.navHeight = getNavHeight();
    this.navStyle = getNavStyle();
  },
  methods: {
    ...mapActions({
      getToken: "AC_GetToken"
    }),
    minibarLeftButtonClick() {
      this.$router.back();
    },
    minibarRightButtonClick() {
      this.$modal.toast({ message: "click !", duration: 1 });
    },
    fetchData() {
      this.getToken().catch(err => {
        this.$router.replace("/login");
      });
    },
  },
  mounted() {
      this.fetchData()
  },
};
</script>
<style>
.page-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
