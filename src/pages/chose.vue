<!--选择套餐 -->
<template>
  <div class='bigBox' style="height:100vh;">
    <div class='container'>
      <!-- banner -->
      <div class="banner">
        <img class="bannerImg" :src="data.img" style="width: 100%;height: 3.62rem;" />
      </div>
      <div class="m20 p20 br12 bg-ff flex-dcc">
        <span class="c9 f24">请选择套餐</span>
        <div class="of-scroll" style="height:3.8rem;">
          <div class="choseBox flex-csb f32" :class="{active:index==isShow}" @click="chose(index,item.id)" v-for="(item,index) in data.item" :key="index">
            <span>{{item.name}}</span>
            <li class="f22"><span class="f32">{{item.price}}</span>元/{{item.minute}}分钟</li>
          </div>
        </div>
        <span class="c9 f24">设备编号：{{data.macno}}</span>
        <div class="main_btn" @click="goBuy">确定</div>
      </div>
      <div class="flex-csa" v-if="query.browser!=2">
        <div class="bBox bg-ff flex-dcc">
          <img class="mt20" :src="data.qrcode" style="width:1.5rem" alt="">
          <div class="c9 f22 mt10">请长按二维码关注</div>
        </div>
        <router-link to="/agent" class="bBox">
          <img src="../assets/img/img8.png" alt="">
        </router-link>
      </div>
    </div>
    <span class="c9 flex-center p20 f24">{{data.company}}</span>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  data() {
    return {
      isShow: 0,
      data: {},
      query: {
        macno: this.$route.query.macno,
        item_id: 0
      }
    };
  },
  components: {},
  computed: {},
  beforeCreate() {},
  created() {
    let _this = this;
    _this.init();
  },
  methods: {
    init: function() {
      let _this = this;
      // 判断当前页面是支付宝还是微信内核，1：微信,2：支付宝
      _this.query.browser =
        _this.$base.isWX_Allipay() == "Allipay"
          ? 2
          : _this.$base.isWX_Allipay() == "WX"
            ? 1
            : 0;
      // 获取当前设备套餐信息
      _this.Http.post("Wxsite/Device/api", {
        api_name: "get_device_pack",
        macno: this.$route.query.macno
      }).then(res => {
        if (res.data.code == 1) {
          _this.data = res.data.data;
          _this.query.item_id = res.data.data.item[0].id;
          _this.query.money = res.data.data.item[0].price;
          _this.query.minute = res.data.data.item[0].minute;
        } else {
          _this.$vux.toast.text(res.data.msg, "center");
          setTimeout(() => {
            // 异常，关闭页面
            WeixinJSBridge.call("closeWindow");
          }, 1500);
        }
      });
    },
    chose: function(index, id) {
      this.isShow = index;
      this.query.item_id = id;
      this.query.money = this.data.item[index].price;
      this.query.minute = this.data.item[index].minute;
    },
    goBuy: function() {
      const _this = this;
      _this.$router.push({
        name: "ConfirmOrder",
        query: _this.query
      });
    }
  },
  mounted: function() {
    // 解决附件返回的坑，加定时器
    var bool = false;
    const _this = this;
    setTimeout(function() {
      bool = true;
    }, 1000);
    window.addEventListener(
      "popstate",
      function(e) {
        // 解决附件返回的坑
        if (bool) {
          // _this.$router.go(0);
        }
      },
      false
    );
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 3.62rem;
}

.choseBox {
  width: 5rem;
  height: 1rem;
  border-radius: 50px;
  background: #f5f5f5;
  padding: 0.3rem;
  margin: 0.2rem 0;
}

.active {
  background: #f49b1b;
  color: #fff;
}

.main_btn {
  width: 6.8rem;
  margin-top: 0.1rem;
}

.bBox {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 0.12rem;
}
</style>
