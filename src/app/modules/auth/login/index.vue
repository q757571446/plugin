<template>
  <div>
    <input placeholder="用户名" v-model="username"></input>
    <input placeholder="密码" v-model="password"></input>
    <text @click="submit">点击登录</text>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      username: 'sensoradmin',
      password: '1111'
    }
  },
  methods: {
    ...mapActions({
      login: 'AC_GetTokenFromNetwork'
    }),
    submit() {
      this.login({
        accountid: this.username,
        password: this.password
      }).then(ret => {
        this.$router.replace('/')
      })
    }
  },
  mounted() {
  }
}
</script>
<style scoped>
  input {
    height: 40px;
    margin: 10px;
    padding: 10px;
    border-width: 1px;
    border-color: gray;
  }
</style>
