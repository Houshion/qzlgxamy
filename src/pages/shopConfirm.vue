<!--确认订单 -->
<template>
  <div class='bigBox' v-if="isData">
    <div class='container' v-for="(i,i2) in Array(allData)" :key="i2">
      <!-- 地址 -->
      <div v-if=" Object.keys(address).length>0" @click="choseAddress">
      <div class="m20 bg-ff p20 br12 flex-csb" v-for="(item,index) in Array(address)" :key="index">
        <ul class="flex-dcf">
          <li>收货人：{{item.name}}</li>
          <li class="mt20">
            <img class="mr20" src="../assets/img/icon7.png" style="width:.22rem;height:.28rem;" alt=""> {{item.address}}
          </li>
        </ul>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
      </div>
      </div>
      <div class="m20 bg-ff p50 br12 flex-center f30" v-else @click="choseAddress">
        <b class="c-diy f30 mr20">&#43;</b> 请添加收货人信息
      </div>
      <!-- 商品 -->
      <div class="m20 bg-ff br12" v-if="goodData.length>0">
        <div class="bb-e5 flex-csb p20" v-for="(item,index) in goodData" :key="index">
          <div class="leftBox flex-cfs">
            <img :src="item.img" class="b-e5" style="width:2rem;height:1.5rem;" alt="">
            <ul class="flex-dcf ml20">
              <span class="f28">{{item.goods_name}}</span>
              <span class="mt20 c9">{{item.spec_name}}</span>
              <span class="br mt20">￥{{item.price|toFixed(2)}}</span>
            </ul>
          </div>
          <div class="rightBox flex-center">
            <span class="flex-center minus b-e5">&#45;</span>
            <span class="flex-center num">{{item.num}}</span>
            <span class="flex-center add b-e5"> &#43;</span>
          </div>
        </div>
        <div class="flex-cfe p20">
          <li class="c9">共{{count}}件商品</li>
          <li class="ml30">小计：<span class="br f30">￥{{sum}}</span></li>
        </div>
      </div>
      <div class="m20 bg-ff br12 p30 flex-dcc" v-else>
       <img src="../assets/img/noImg.jpg" class="noImg" alt="">
       <span class="c9 mt20">暂无数据</span>
      </div>
      <div class="m20 bg-ff br12">
        <li class="flex-csb p20 bb-e5">
          <span class="c9">选择支付方式</span>
          <span>需支付{{sum}}元</span>
        </li>
        <li class="flex-csb p20 bb-e5" @click="pay_type=2">
          <ul class="flex-center">
            <img src="../assets/img/icon_weixinzhifu.png" style="width:.42rem;" alt="">
            <li class="ml20">微信支付</li>
          </ul>
          <label>
                    <input type="radio" class="checkInput" name="pay" id="" hidden checked>
                    <span class="circle flex-center"></span>
                  </label>
        </li>
        <li class="flex-csb p20" @click="pay_type=1">
          <ul class="flex-center">
            <img src="../assets/img/ic_yue.png" style="width:.38rem;" alt="">
            <li class="ml20">余额支付</li>
          </ul>
          <label>
                    <input type="radio" class="checkInput" name="pay" id="" hidden>
                    <span class="circle flex-center"></span>
                  </label>
        </li>
      </div>
      <div class="main_btn" @click="pay(i)">支付</div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      address: {},
      // {
      //   name: "小云",
      //   addr: "广东省东莞市南城区高盛科技大厦303"
      // }
      pay_type: 2,
      off: false,
      isData: 0,
      goodData: [],
      allData: []
    };
  },
  components: {},
  computed: {
    sum: function() {
      let that = this;
      let sum = 0;
      for (let i in this.goodData) {
        sum += that.goodData[i].price * 1 * that.goodData[i].num * 1;
      }
      return sum;
    },
    count: function() {
      let num = 0;
      for (let i in this.goodData) {
        num += this.goodData[i].num * 1;
      }
      return num;
    }
  },
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
    }, 800);
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
          // that.init();
        }
        //  window.location.href = "/itsm"  //  要返回的页面地址
      },
      false
    );
  },
  methods: {
    init: function() {
      //数据初始化
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        api_name: "confirm_order",
        spec_id: that.$route.query.spec_id,
        addr_id: that.$route.query.addr_id,
        num: that.$route.query.num
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.isData = 1;
          that.$vux.loading.hide();
          let obj = res.data.data.goods_list;
          obj.num = res.data.data.goods_num;
          that.address = res.data.data.addr;
          that.goodData = Array(res.data.data.goods_list);
          that.allData = res.data.data;
          console.log(that.address.length);
        } else {
          that.$vux.toast.text(res.data.msg, "center");
          window.setTimeout(function() {
            that.reload();
            that.$router.push({
              path: "/shop"
            });
          }, 1500);
        }
      });
    },
    choseAddress: function() {
      let that = this;
      that.reload();
      that.$router.push({
        path: "/Address",
        query: {
          spec_id: that.$route.query.spec_id,
          num: that.$route.query.num
        }
      });
    },
    pay: function(item) {
      let that = this;
      if (that.off) return false;
      that.off = 1;
      that.$vux.loading.show();
      console.log(that.pay_type);
      that.Http.post("Wxsite/Mall/api", {
        api_name: "payment_order",
        pay_type: that.pay_type,
        spec_id: that.$route.query.spec_id,
        num: that.$route.query.num,
        addr_id: item.addr.id
      }).then(res => {
        console.log(res.data.data);
        that.$vux.loading.hide();
        that.off = 0;
        if (res.data.code == 1) {
          if (that.pay_type == 2) {
            //微信支付
            var jsApiParameters = res.data.data.wx_data;
            that.$base.callpay(jsApiParameters, res => {
              if (res == "get_brand_wcpay_request:ok") {
                window.setTimeout(function() {
                  that.reload();
                  that.$router.push({
                    path: "/shopOrder"
                  });
                }, 1500);
              } else {
                that.$vux.toast.text("支付失败", "center");
                window.setTimeout(function() {
                  that.reload();
                  that.$router.push({
                    path: "/shopOrder"
                  });
                }, 1500);
              }
            });
          } else {
            console.log(res.data.msg);
            that.$vux.toast.text(res.data.msg, "center");
            window.setTimeout(function() {
              that.reload();
              that.$router.push({
                path: "/shopOrder"
              });
            }, 1500);
          }
        } else {
          console.log(res.data.msg);
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    minus: function(index) {
      if (this.goodData[index].num > 1) {
        this.goodData[index].num--;
      }
    }
  }
};
</script>

<style scoped>
.rightBox span {
  width: 0.48rem;
  height: 0.48rem;
  color: #999;
  border-radius: 0.12rem;
}
</style>
