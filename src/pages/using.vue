<!--使用中 -->
<template>
  <div class="bigBox bg-diy" style="height:100vh;">
    <div class="container flex-dcc">
      <div class="useBox flex-dcc jc-center">
        <div class="c9">{{item_name}}</div>
        <div class="cr f72">{{time | countTime}}</div>
      </div>
      <!-- <router-link :to=""></router-link> -->
      <div class="c-diy bg-ff br30 p8-20" v-if="feedback" @click="goFeedback">我要报障</div>
      <div class="bottom-fixed bottom"></div>
    </div>
  </div>
</template>

<script>
import { AlertModule } from "vux";
export default {
  name: "using",
  data() {
    return {
      item_name: "适合放松",
      time: 0,
      macno: 2018072615252502,
      interval: "",
      countDownInterval: "",
      feedback: true,
      a: ""
    };
  },
  components: {
    AlertModule
  },
  computed: {},
  created() {
    let _this = this;
    _this.feedback = _this.$base.isWX_Allipay() == "Allipay" ? false : true;
    _this.init();
  },
  mounted() {
    window.onpopstate = () => {
      if (!this.allowBack) {
        //    这个allowBack 是存在vuex里面的变量
        history.go(1);
      }
    };
    const _this = this;
    _this.a = document.addEventListener(
      "webkitvisibilitychange",
      function() {
        if (document.webkitVisibilityState == "hidden") {
          // 熄屏后动作
          // b = Date.now();
          // alert("测试 熄屏");
        } else {
          // 亮屏后动作
          clearInterval(_this.countDownInterval);
          clearInterval(_this.interval);
          // alert("测试 亮屏");
          _this.init();
        }
      },
      false
    );
  },
  watch: {
    // time: function() {
    //   clearInterval(this.countDownInterval);
    //   this.countDown();
    // }
  },
  methods: {
    init: function() {
      const _this = this;
      _this.Http.post("Wxsite/Device/api", {
        api_name: "count_down",
        order_id: _this.$route.query.order_id
      }).then(res => {
        if (res.data.code == 1) {
          _this.macno = _this.$route.query.macno;
          _this.time = res.data.data.time;
          _this.item_name = res.data.data.item_name;
          _this.countDown();
          _this.interval = setInterval(() => {
            _this.checkFault();
          }, 5000);
        } else {
          _this.$vux.toast.text(res.data.msg, "center");
          setTimeout(() => {
            WeixinJSBridge.call("closeWindow");
          }, 1500);
        }
      });
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    countDown: function() {
      var that = this;
      that.countDownInterval = window.setInterval(function() {
        if (that.time > 1) {
          that.time -= 1;
        } else {
          clearInterval(that.countDownInterval);
          clearInterval(that.interval);
          that.removeListener();
          if (that.feedback) {
            that.$router.push({
              path: "./AmOrder"
            });
          } else {
            AlipayJSBridge.call("closeWebview");
          }
        }
      }, 1000);
    },
    checkFault: function(order_id) {
      const _this = this;
      // alert("order_id:::" + _this.$route.query.order_id);
      _this.Http.post("Wxsite/Device/api", {
        api_name: "fault",
        order_id: _this.$route.query.order_id
      }).then(res => {
        if (res.data.code != 1 && res.data.code != -1) {
          AlertModule.show({
            title: "提示",
            content: res.data.msg,
            onHide() {
              WeixinJSBridge.call("closeWindow");
            }
          });
        } else if (res.data.code == -1) {
          AlertModule.show({
            title: "提示",
            content: res.data.data.data,
            onHide() {
              if (res.data.data.phone) {
                window.location.href = "tel:" + res.data.data.phone;
              }
            }
          });
        }
      });
    },
    goFeedback: function() {
      const _this = this;
      clearInterval(_this.countDownInterval);
      clearInterval(_this.interval);
      _this.removeListener();
      _this.$router.push({
        path: "/Repair",
        query: {
          macno: _this.macno
        }
      });
    },
    addListener() {
      if (document.webkitVisibilityState == "hidden") {
        // 熄屏后动作
        // b = Date.now();
        // alert("测试 熄屏");
      } else {
        // 亮屏后动作
        clearInterval(_this.countDownInterval);
        clearInterval(_this.interval);
        // alert("测试 亮屏");
        _this.init();
      }
    },
    removeListener() {
      document.removeEventListener(
        "webkitvisibilitychange",
        this.remove(),
        false
      ); // 移除检测熄灭屏幕
    },
    remove() {
      // alert("成功删除监听事件");
    }
  }
};
</script>

<style scoped>
.bottom {
  background: url("~@/./assets/img/img10.png") no-repeat;
  background-size: 100% 100%;
  border: 0;
  height: 2.01rem;
}

.useBox {
  background: url("~@/./assets/img/img11.png") no-repeat;
  background-size: 100% 100%;
  width: 3.64rem;
  height: 3.64rem;
  margin: 2.4rem 0;
}
</style>
