<!--确认订单 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="m20 bg-ff p20 br12">
        <div class="flex-csb c9">
          <span>已选择套餐</span>
          <span>{{orderMsg.item.name}}({{money}}元/{{minute}}分钟)</span>
        </div>
        <div class="mtb60 flex-center f28" style="color:#f49b1b;">￥<span class="f100">{{money|toFixed(2)}}</span></div>
      </div>
      <div class="m20 bg-ff p30 br12 flex-csb" @click="coupon">
        <span>优惠券</span>
        <div class="flex-csb">
          <div class="mr10">{{couponName}}</div>
          <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
        </div>
      </div>
      <div class="m20 bg-ff p30 br12 flex-csb" @click="coupon" v-if="orderMsg.offset_money!='0.00'? true: false">
        <span>抽奖金额自动抵扣</span>
        <div class="flex-csb">
          <div class="mr10">{{orderMsg.offset_money}}</div>
        </div>
      </div>
      <div class="m20 bg-ff br12">
        <li class="flex-csb p20 bb-e5">
          <span class="c9">选择支付方式</span>
          <span>需支付{{need_price|toFixed(2)}}元</span>
        </li>
        <label class="flex-csb p20 bb-e5" v-if="param.pay_type!=3" @click="param.pay_type=2">
          <ul class="flex-cfs">
            <img src="../assets/img/icon_weixinzhifu.png" style="width:.42rem;" alt="">
            <span class="c9 ml20">微信支付</span>
          </ul>
            <input type="radio" class="checkInput" name="chose" :checked="param.pay_type==2" hidden>
          <span class="circle"></span>
        </label>
        <label class="flex-csb p20" v-if="param.pay_type!=3" @click="param.pay_type=1">
          <ul class="flex-cfs">
            <img src="../assets/img/ic_yue.png" style="width:.38rem;" alt="">
            <span class="c9 ml20">余额支付</span>
          </ul>
            <input type="radio" class="checkInput" name="chose" :checked="param.pay_type==1" hidden>
          <span class="circle"></span>
        </label>
        <label class="flex-csb p20" v-if="param.pay_type==3" @click="param.pay_type=3">
          <ul class="flex-cfs">
            <img src="../assets/img/ic_zhifubao.png" style="width:.38rem;" alt="">
            <span class="c9 ml20">支付宝支付</span>
          </ul>
            <input type="radio" class="checkInput" name="chose" :checked="param.pay_type==3" hidden>
          <span class="circle"></span>
          <div id="alipayForm" style="display:none"></div>
        </label>
      </div>
      <div class="main_btn" @click="pay">支付</div>
      <div class="mask" v-if="isShow" @click="closeMask"></div>
      <div class="bottom-fixed bg-ff p-r" style="z-index:100;max-height:5.6rem; border-top-left-radius: .18rem; border-top-right-radius: .18rem;" v-if="isShow">
        <li class="p20 flex-csb bb-e5">
          <span class="c9" @click="del">不使用优惠券</span>
          <!-- <span class="c-diy" @click="confirm">确认</span> -->
        </li>
        <div class="of-scroll" style="max-height:4.5rem">
          <li class="flex-csb p20" v-for="(item,index) in couponList" :key="index" @click="confirm(item.offset_money,item.id)">
            <ul class="flex-cfs">
              <div class="moneyBox flex-center cf">
                ￥<span class="f32">{{item.offset_money}}</span>
              </div>
              <div class="flex-dcf ml20">
                <li class="f32">{{item.name}}</li>
                <li class="c9">{{item.ctime | timeStr("Y.m.d")}}-{{item.etime | timeStr("Y.m.d")}}</li>
              </div>
            </ul>
            <!-- <span class="circle" :class="{active:isCoupon==index}"></span> -->
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "vux";
export default {
  data() {
    return {
      money: this.$route.query.money,
      minute: this.$route.query.minute,
      isShow: false,
      couponName: "",
      couponList: [],
      noCoupon: false,
      payMoney: this.$route.query.money,
      jsApiParameters: {},
      browser: 0,
      param: {
        api_name: "pay_order",
        macno: this.$route.query.macno,
        item_id: this.$route.query.item_id,
        pay_type: 2
      },
      orderMsg: {
        item: {
          id: "1",
          name: "测试套餐", //套餐名称
          price: "0.01", //价格
          minute: "1" //时间
        },
        switch: "1", //抽奖开关 1开 0关
        need_price: 0.01, //需要支付金额
        offset_money: "0.00" //抵消金额
      },
      checkOpen: ""
    };
  },
  components: {
    Loading
  },
  computed: {
    need_price: function() {
      let pay = Number(this.orderMsg.need_price) - Number(this.couponName);
      return pay > 0 ? pay : 0;
    }
  },
  // 返回后退监听
  mounted() {
    // 解决附件返回的坑，加定时器
    var bool = false;
    let that = this;
    setTimeout(function() {
      bool = true;
    }, 1000);
    window.addEventListener(
      "popstate",
      function(e) {
        // 解决附件返回的坑
        if (bool) {
        }
        //  window.location.href = "/itsm"  //  要返回的页面地址
      },
      false
    );
  },
  watch: {
    storeParam: function() {
      console.log(1111);
    }
  },
  created() {
    let _this = this;
    _this.Http.post("Wxsite/User/api", {
      api_name: "my_coupon"
    }).then(res => {
      _this.couponList = [...res.data.data];
      if (_this.couponList.length <= 0) {
        _this.noCoupon = true;
      }
    });
    _this.init();
  },
  beforeMount() {
    const _this = this;
    _this.param.pay_type =
      _this.$base.isWX_Allipay() == "Allipay"
        ? 3
        : _this.$base.isWX_Allipay() == "WX"
          ? 2
          : 1;
  },
  methods: {
    init: function() {
      const _this = this;
      _this.Http.post("Wxsite/Device/api", {
        api_name: "confirm_order",
        item_id: this.$route.query.item_id,
        macno: _this.$route.query.macno
      }).then(res => {
        _this.orderMsg = res.data.data;
      });
    },
    coupon: function() {
      if (!this.noCoupon) {
        this.isShow = !this.isShow;
      } else {
        this.$vux.toast.text(res.data.msg, "center");
      }
    },
    del: function() {
      this.isShow = false;
      this.couponName = "";
      delete this.param.coupon_id;
    },
    confirm: function(name, id) {
      this.isShow = false;
      this.couponName = name;
      this.param.coupon_id = id;
    },
    closeMask: function() {
      const _this = this;
      _this.isShow = false;
    },
    pay: function() {
      const _this = this;
      this.$vux.loading.show({
        text: "请稍候..."
      });
      _this.Http.post("Wxsite/Device/api", _this.param).then(res => {
        _this.$vux.loading.hide();
        if (res.data.code == 1) {
          if (_this.param.pay_type == 2) {
            // 微信支付
            _this.jsApiParameters = res.data.data.wx_data;
            _this.$base.callpay(_this.jsApiParameters, reCall => {
              if (reCall == "get_brand_wcpay_request:ok") {
                _this.checkOpen = setInterval(() => {
                  _this.check_opening(res.data.data.order_id, back => {
                    if (back) {
                      clearInterval(_this.checkOpen);
                      let url;
                      if (_this.orderMsg.switch == "1") {
                        url = "game";
                      } else {
                        url = "using";
                      }
                      _this.$router.push({
                        path: "./" + url,
                        query: {
                          order_id: res.data.data.order_id,
                          browser: _this.param.pay_type,
                          macno: _this.$route.query.macno
                        }
                      });
                    }
                  });
                }, 2000);
              } else {
                _this.$vux.toast.text(res.data.msg, "center");
              }
            });
          } else if (_this.param.pay_type == 3) {
            //支付宝支付
            function ready(callback) {
              // 如果jsbridge已经注入则直接调用
              if (window.AlipayJSBridge) {
                callback && callback();
              } else {
                // 如果没有注入则监听注入的事件
                document.addEventListener(
                  "AlipayJSBridgeReady",
                  callback,
                  false
                );
              }
            }
            AlipayJSBridge.call(
              "tradePay",
              {
                orderStr: res.data.data.data
              },
              function(result) {
                // alert(JSON.stringify(result));
                if (result.resultCode == "9000") {
                  _this.$vux.toast.text("支付成功", "center");
                  // _this.$vux.loading.show({
                  //   text: "请稍候..."
                  // });
                  _this.checkOpen = setInterval(() => {
                    _this.check_opening(res.data.data.order_id, back => {
                      if (back) {
                        clearInterval(_this.checkOpen);
                        _this.$router.push({
                          path: "./using",
                          query: {
                            order_id: res.data.data.order_id
                          }
                        });
                      }
                    });
                  }, 2000);
                } else if (result.resultCode == "8000") {
                  _this.$vux.toast.text(
                    "后台获取支付结果超时，暂时未拿到支付结果",
                    "center"
                  );
                  onOff = 0;
                } else if (result.resultCode == "6004") {
                  _this.$vux.toast.text(
                    "支付过程中网络出错， 暂时未拿到支付结果",
                    "center"
                  );
                  onOff = 0;
                } else if (result.resultCode == "6001") {
                  _this.$vux.toast.text("用户取消支付", "center");
                  onOff = 0;
                } else {
                  _this.$vux.toast.text("支付失败", "center");
                  onOff = 0;
                }
              }
            );
          }
        } else if (res.data.code == 88) {
          // 余额支付&&支付金额为0
          _this.$vux.toast.text(res.data.msg, "center");
          let url;
          url = "using";
          // if (_this.orderMsg.switch == "1") {
          //   url = "game";
          // } else {
          // }
          _this.checkOpen = setInterval(() => {
            _this.check_opening(res.data.data.order_id, back => {
              // console.log(back);
              if (back) {
                // console.log("开启成功，跳转使用");
                clearInterval(_this.checkOpen);
                _this.$router.push({
                  path: "./" + url,
                  query: {
                    order_id: res.data.data.order_id,
                    browser: _this.param.pay_type,
                    macno: _this.$route.query.macno
                  }
                });
              }
            });
          }, 2000);
        } else {
          _this.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    check_opening(id, callback) {
      const _this = this;
      var status = false;
      _this.Http.post("Wxsite/Device/api", {
        api_name: "check_opening",
        order_id: id
      }).then(res => {
        _this.$vux.toast.text(res.data.msg, "center");
        if (res.data.code == 1) {
          status = true;
        } else if (res.data.code == -8) {
          setTimeout(() => {
            WeixinJSBridge.call("closeWindow");
          }, 1500);
        } else {
          status = false;
        }
        callback(status);
      });
    }
  },
  mounted() {
    // 解决附件返回的坑，加定时器
    // var bool = false;
    // const _this = this;
    // setTimeout(function() {
    //   bool = true;
    // }, 1000);
    // window.addEventListener(
    //   "popstate",
    //   function(e) {
    //     // 解决附件返回的坑
    //     if (bool) {
    //       _this.init();
    //     }
    //   },
    //   false
    // );
  }
};
</script>

<style scoped>
.checkInput:checked + .circle {
  background: url("~@/./assets/img/ic_gouxuan.png") no-repeat;
  background-size: 100% 100%;
  border: 0;
}

.moneyBox {
  width: 1.7rem;
  height: 1.2rem;
  background: url("~@/./assets/img/img9.png") no-repeat;
  background-size: 100% 100%;
}

.active {
  background: url("~@/./assets/img/ic_gouxuan.png") no-repeat;
  background-size: 100% 100%;
  border: 0;
}
</style>
