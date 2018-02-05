<template>
  <div>
    <text>{{token}}</text>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["token"])
  },
};
</script>
