<!--账户管理 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="banner flex-dcc br12 jc-center">
        <li class="f72">￥{{data.money}}</li>
        <li class="mt20 cf">可提现金额</li>
        <router-link :to="{path:'/Deposit?money='+data.money}" class="depositBtn mt20 c1-diy flex-center">提现</router-link>
      </div>
      <div class="m20 bg-ff br12">
        <div class="list flex-csb p30 bb-e5" v-for="(item,index) in data.log" :key="index">
          <ul class="flex-dcf">
            <li class="f33">提现到银行卡</li>
            <li class="mt20 c9">{{item.ctime | timeStr("Y-m-d H:i")}}</li>
          </ul>
          <li class="c-diy f44">-¥{{item.money|toFixed(2)}}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        money: "0.00",
        log: [
          {
            id: "1",
            pid: "1",
            money: "0.00",
            ctime: "1541990030"
          }
        ]
      }
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "account",
      token: localStorage.getItem("token")
    }).then(res => {
      // 账号在其他设备登录，强制跳出重新登录
      if (res.data.code == 101) {
        _this.$vux.toast.show({
          type: "text",
          text: "账号在其他设备登录，为避免损失请修改密码并重新登录",
          position: "center",
          time: 3000
        });
        _this.$router.push({ path: "./login" });
      }
      _this.data = res.data.data;
    });
  },
  methods: {
    init: function() {
      console.log(1);
    }
  }
};
</script>

<style scoped>
.banner {
  background: url("../assets/img/img13.png") no-repeat;
  background-size: 100% 100%;
  width: 7.1rem;
  height: 3.6rem;
  margin: 0.2rem auto 0;
  color: #fff;
}

.depositBtn {
  width: 2.2rem;
  height: 0.6rem;
  background: #fff;
  border-radius: 0.12rem;
}
.list:last-child {
  border: 0;
}
</style>
