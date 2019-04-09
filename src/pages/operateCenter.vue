<!--运营中心 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="bg-ff m20 p30 br12 bg1">
        <div class="flex-csb">
          <div class="flex-dcc w50">
            <li class="c-diy f50">{{data.order_today}}</li>
            <li class="c9 flex-center mt20"><img class="mr20" src="../assets/img/ic_jinridingdan.png" style="width:.27rem;" alt="">今日订单数</li>
          </div>
          <div class="flex-dcc w50">
            <li class="c-diy f50">{{data.device_online}} <span class="c9 f50">/{{data.device_total}}</span></li>
            <li class="c9 flex-center mt20"><img class="mr20" src="../assets/img/ic_zaixianshebei.png" style="width:.3rem;" alt=""><span class="c3">在线</span>/总台数</li>
          </div>
        </div>
        <div class="flex-csb mt50">
          <div class="flex-dcc">
            <li class="f50 c-diy">￥{{data.today_income|toFixed(2)}}</li>
            <li class="c9 mt20 flex-center"><img class="mr20" src="../assets/img/ic_jinri.png" style="width:.25rem;" alt="">今日收益</li>
          </div>
          <div class="flex-dcc">
            <li class="f50 c-diy">￥{{data.month_income|toFixed(2)}}</li>
            <li class="c9 mt20 flex-center"><img class="mr20" src="../assets/img/ic_jinridingdan.png" style="width:.25rem;" alt="">本月收益</li>
          </div>
          <div class="flex-dcc">
            <li class="f50 c-diy">￥{{data.total_income|toFixed(2)}}</li>
            <li class="c9 mt20 flex-center"><img class="mr20" src="../assets/img/ic_leiji.png" style="width:.25rem;" alt="">累计收益</li>
          </div>
        </div>
      </div>
      <div class="m20 flex-csb r-wrap">
        <router-link :to='{path: "/incomeCount"}'>
          <div class="cBox flex-dcc bg-ff jc-center br12 mb20">
            <img src="../assets/img/ic_shourutongji.png" style="width:.72rem;" alt="">
            <span class="mt20">收入统计</span>
          </div>
        </router-link>
        <router-link :to='{path: "/device"}'>
          <div class="cBox flex-dcc bg-ff jc-center br12 mb20">
            <img src="../assets/img/ic_shebei.png" style="width:.72rem;" alt="">
            <span class="mt20">设备管理</span>
          </div>
        </router-link>
        <router-link :to='{path: "/myOrder"}'>
          <div class="cBox flex-dcc bg-ff jc-center br12 mb20">
            <img src="../assets/img/ic_dingdanguanli.png" style="width:.72rem;" alt="">
            <span class="mt20">订单管理</span>
          </div>
        </router-link>
        <router-link :to='{path: "/accountManage"}'>
          <div class="cBox flex-dcc bg-ff jc-center br12 mb20">
            <img src="../assets/img/ic_account.png" style="width:.72rem;" alt="">
            <span class="mt20">账户管理</span>
          </div>
        </router-link>
      </div>
      </div>
    </div>
</template>

<script>
import Vuex from "vuex"; //引用vuex
export default {
  data() {
    return {
      data: {
        device_online: "0",
        device_total: "0",
        month_income: "0.00",
        order_today: "0",
        today_income: "0.00",
        total_income: "0.00"
      }
    };
  },
  components: {},
  computed: Vuex.mapState(["token"]),
  created() {
    let _this = this;
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "center",
      token: localStorage.getItem("token")
    }).then(res => {
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
  methods: {}
};
</script>

<style scoped>
.bg1 {
  background: url("../assets/img/img12.png") no-repeat;
  background-size: 100% 100%;
}
.cBox {
  width: 3.48rem;
  height: 2.7rem;
}
</style>
