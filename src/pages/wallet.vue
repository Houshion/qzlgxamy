<!-- 钱包 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="banner m20 flex-dcc cf jc-center">
        <span class="f80">￥{{money|toFixed(2)}}</span>
        <span class="mt20">我的余额(元)</span>
        <span class="mt20 recharge flex-center bg-ff br12" @click="recharge">充值</span>
      </div>
      <router-link to="/Coupon" class="m20 p30 bg-ff flex-csb br12">
        <span>优惠券</span>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
      </router-link>
      <div class="m20 bg-ff br12">
        <p class="p30 bb-e5">明细</p>
        <div v-if="isData">
        <div v-if="detail.length>0">
          <div class="flex-csb p30 bb-e5 list" v-for="(item,index) in detail" :key="index">
            <ul class="flex-dcf">
              <span>{{item.type_name}}</span>
              <span class="c9 mt20">{{item.ctime|timeStr('Y-m-d H:i:s')}}</span>
            </ul>
            <span class="br f38">{{item.type==1?'+':'-'}}{{item.money}}</span>
          </div>
        </div>
        <div class="p30 c9" v-else>
          <noData></noData>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "../components/noData";
export default {
  filters: {
    numFilter(value) {
      // 截取当前数据到小数点后三位

      let transformVal = Number(value).toFixed(3);

      let realVal = transformVal.substring(0, transformVal.length - 1); // num.toFixed(3)获取的是字符串

      return Number(realVal);
    }
  },
  data() {
    return {
      money: "0",
      isData: 0,
      detail: [
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // },
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // },
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // },
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // },
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // },
        // {
        //   type_name: "充值",
        //   ctime: "2017-11-12  20:23",
        //   money: "+100.00"
        // }
      ]
    };
  },

  components: {
    noData
  },

  computed: {},

  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
    }, 800);
    console.log(Number(that.money).toFixed(2));
    that.money = Number(that.money).toFixed(2);
  },

  methods: {
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "my_wallet"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.money = res.data.data.money;
          that.detail = res.data.data.list;
          console.log(that.detail.length);
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    },
    recharge: function() {
      this.$router.push("/Recharge");
    }
  }
};
</script>

<style scoped>
.banner {
  background: url("../assets/img/img1.png") no-repeat;
  background-size: 100% 100%;
  height: 3.6rem;
}

.recharge {
  width: 2.2rem;
  height: 0.6rem;
  color: #f49b1b;
}

.list:last-child {
  border: 0;
}
</style>
