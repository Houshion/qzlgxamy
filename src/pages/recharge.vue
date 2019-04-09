<!--充值 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="p20">充值金额</div>
      <div class="p20 flex-fssb r-wrap">
        <label class="listBox flex-center" :class="{active: index == isShow}" for="" v-for="(item,index) in list" :key="index" @click='chose(item,index)'>
        <input type="radio" hidden name="chose">
        <span>充{{item.money}}送{{item.give_money}}</span>
      </label>
      </div>
      <p class="mt50 p20">选择支付方式</p>
      <div class="flex-csb bg-ff m20 br12 p30">
        <ul class="flex-center">
          <img src="../assets/img/icon_weixinzhifu.png" style="width:.42rem" alt="">
          <span class="ml20">微信</span>
        </ul>
        <div class="circle" :class="{checkActive:payShow==true}" @click="payChose"></div>
      </div>
      <div class="main_btn" @click="comfirm">支付</div>
    </div>
  </div>
</template>

<script>
import { Loading } from "vux";
export default {
  data() {
    return {
      isShow: 0,
      checkId: "",
      payShow: 1,
      list: [
        // {
        //   title: "充500送100"
        // },
        // {
        //   title: "充500送100"
        // },
        // {
        //   title: "充500送100"
        // },
        // {
        //   title: "充500送100"
        // },
        // {
        //   title: "充500送100"
        // }
      ]
    };
  },
  components: {
    Loading
  },
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "recharge_item"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.list = res.data.data;
          that.checkId = res.data.data[0].option_id;
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    },
    chose: function(item, index) {
      this.isShow = index;
      this.checkId = item.option_id;
    },
    payChose: function() {
      this.payShow = !this.payShow;
    },
    comfirm: function() {
      let that = this;
      this.$vux.loading.show({
        text: "请稍候..."
      });
      that.Http.post("Wxsite/User/api", {
        api_name: "recharge",
        option_id: that.checkId
      }).then(res => {
        that.$vux.loading.hide();
        if (res.data.code == 1) {
          that.$base.callpay(res.data.data.wx_data, res => {
            if (res == "get_brand_wcpay_request:ok") {
              setTimeout(() => {
                _this.$router.push({ path: "./wallet" });
              }, 1500);
            } else {
              that.$vux.toast.text("支付失败", "center");
            }
          });
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
.listBox {
  width: 3.36rem;
  height: 1.1rem;
  background: #fff;
  border-radius: 0.12rem;
  margin-bottom: 0.2rem;
}

.active {
  background: #f49b1b;
  color: #fff;
}
.checkActive {
  background: url(~@/./assets/img/ic_gouxuan.png) no-repeat;
  background-size: 100% 100%;
  border: 0;
}
</style>
