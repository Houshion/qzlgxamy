<!--代理登陆 -->
<template>
  <div class='bigBox'>
    <div class='container bg-ff'>
      <div class="flex-center">
        <img src="../assets/img/icon_logo.png" class="logo" alt="">
      </div>
      <li class="flex-cfs bb-e5 m30 p20">
        <img src="../assets/img/ic_zhanghao.png" style="width:.27rem;" alt="">
        <!-- <input class="ml20" type="text" placeholder="请输入账号名" maxlength="11" v-model="name" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')"> -->
        <input class="ml20 flex1" type="text" placeholder="请输入账号名" v-model="name" >
      </li>
      <li class="flex-cfs bb-e5 m30 p20">
        <img src="../assets/img/ic_mima.png" style="width:.27rem;" alt="">
        <input class="ml20 flex1" type="password" placeholder="请输入密码" v-model="password">
      </li>
      <div class="main_btn" @click="login">确定</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
  },
  methods: {
    login() {
      const _this = this;
      _this.Http.post("Wxsite/Wms/api", {
        api_name: "login",
        username: _this.name,
        password: _this.password
      }).then(res => {
        _this.$vux.toast.text(res.data.msg, "center", 3000);
        localStorage.setItem("token", res.data.data);
        // _this.$store.commit('saveToken',res.data.data)
        if (res.data.code == 1) {
          setTimeout(() => {
            _this.$router.push({ name: "operateCenter" });
          }, 1500);
        }
      });
    }
  }
};
</script>

<style scoped>
.logo {
  width: 2.8rem;
  height: 2.8rem;
  margin: 1.7rem auto 0;
}
</style>
