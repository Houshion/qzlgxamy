<!--商城详情 -->
<template>
  <div class='bigBox' style="height:100vh" v-if="isData">
    <div class='container'>
      <!-- banner -->
      <swiper :swiper="bannerlist"></swiper>
      <!-- <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in bannerlist" :key="index">
            <img class="bannerImg" :src="item.imgurl" style="width: 100%;height: 3.62rem;" />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div> -->
      <!-- 标题价格 -->
      <div class="mlr20 p20 br12 bg-ff flex-csb">
        <div class="flex-dcf">
          <li>{{name}}</li>
          <li class="br mt20 f30">￥{{price|toFixed(2)}}</li>
        </div>
        <div class="flex-center">
          <span class="pr20 c9">月销{{month_sale}}笔</span>
          <div class="share flex-dce plr20" style="border-left:1px dashed #ccc;" @click="shareShow=true">
            <img src="../assets/img/icon_share.png" style="width:.46rem;height:.46rem;" alt="">
            <span>分享</span>
          </div>
        </div>
      </div>
      <!-- <group class="m20 bg-ff">
            <popup-picker title="选择产品规格" :show-name="true" :data="goods_spec" v-model="sizeVal" @on-change="onChange"></popup-picker>
            </group> -->
      <div class="m20 bg-ff flex-csb p20 br12" @click="isShow=true">
        <span>选择产品规格</span>
        <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
      </div>
      <!-- 详情 -->
      <div class="m20 bg-ff flex-dcf p20 br12">
        <div class="flex-cfs">
          <b class="mr20" style="width:.06rem;height:.16rem;background:#f49b1b;"></b> 详情
        </div>
        <div class="mt20">
          <span v-if="details" v-html="details">{{details}}</span>
          <span class="c9" v-else>暂无数据</span>
        </div>
      </div>
    </div>
    <div class="bg-diy p20 cf flex-center" @click="buy">
      立即购买
    </div>
    <div class="mask" v-if="isShow">
      <div class="bottom-fixed bg-ff">
        <div class="flex-cfe p20" @click="isShow=false"><img src="../assets/img/ic_quxiao.png" style="width:.4rem;" alt=""></div>
        <div class="bb-e5 flex-csb p20">
          <div class="leftBox flex-cfs">
            <img :src="imgUrl" class="b-e5" style="width:2rem;height:1.5rem;" alt="">
            <ul class="flex-dcf ml20">
              <span class="f28">{{name}}</span>
              <span class="mt20 c9">{{goodData.type}}</span>
              <span class="br mt20">￥{{sum}}</span>
            </ul>
          </div>
          <div class="rightBox flex-center">
            <span class="flex-center minus b-e5" @click="minus">&#45;</span>
            <span class="flex-center num">{{goodData.num}}</span>
            <span class="flex-center add b-e5" @click="add"> &#43;</span>
          </div>
        </div>
        <div class="f32 p20 bb-e5">产品规格</div>
        <div class="flex-cfs r-wrap p20 ">
          <span class="cBox bg-e6 br30 mr20 c9" :class="{active:index==sizeIndex}" v-for="(item,index) in sizeArr" :key="index" @click="chose(item,index)">{{item.name}}</span>
        </div>
        <div class="bg-diy p20 cf flex-center mt20" @click="buy">
          立即购买
        </div>
      </div>
    </div>
    <share v-show="shareShow" @touch="shareShow=false"></share>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import swiper from "../components/swiper";
import share from "../components/share";
// import { PopupPicker, Group, Cell } from "vux";
export default {
  inject: ["reload"],
  components: { share, swiper },
  data() {
    return {
      name: "",
      isShow: false,
      shareShow: false,
      price: "",
      imgUrl: "",
      isData: 0,
      spec_id: "",
      month_sale: 0, //月销量
      sizeArr: [], //产品数据
      sizeIndex: 0, //选中
      details: "", //详情
      bannerlist: [],
      goodData: {
        title: "",
        type: "",
        money: "0",
        num: "1"
      },
      weixinApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone",
        "updateAppMessageShareData",
        "updateTimelineShareData"
      ],
      shareParam: {
        title: "共享按摩椅", // 分享标题
        desc: "共享按摩椅", // 分享描述
        link: window.location.href, // 分享链接
        imgUrl: "../assets/img/icon_share.png" // 分享图标
      },
      format: function(value, name) {
        return `${value[0]}:${value[1]}`;
      }
    };
  },
  computed: {
    sum: function() {
      let that = this;
      let sum = 0;
      sum += that.goodData.money * 1 * that.goodData.num * 1;
      return sum;
    }
  },
  created() {
    let that = this;
    // 初始化详情信息
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
    }, 800);
    // 获取商品规格
    that.Http.post("wxsite/Mall/api", {
      api_name: "get_goods_spec",
      goods_id: this.$route.query.id
    }).then(res => {
      console.log(res.data.data);
      if (res.data.code == 1) {
        let nameArr = [],
          priceArr = [];
        that.sizeArr = res.data.data;
        that.goodData.money = res.data.data[0].price;
        that.goodData.id = res.data.data[0].id;
        that.goodData.type = res.data.data[0].name;
      } else {
        that.$vux.toast.text(res.data.msg, "center");
      }
    });
  },
  methods: {
    init: function() {
      let that = this;
      console.log(that.Http);
      // 获取详情信息
      that.Http.post("Wxsite/Mall/api", {
        api_name: "goods_detail",
        goods_id: this.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.bannerlist = res.data.data.imgs;
          that.name = res.data.data.name;
          that.imgUrl = res.data.data.picture;
          that.price = res.data.data.price;
          that.month_sale = res.data.data.month_sale;
          that.details = res.data.data.details;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    onChange(value) {
      this.sizeId = value[0];
    },
    buy: function() {
      let that = this;
      if (that.goodData.id == "") {
        that.$vux.toast.text("请先选择产品规格", "center");
      } else {
        let that = this;
        that.reload();
        that.$router.push({
          path: "/shopConfirm",
          query: {
            spec_id: that.goodData.id,
            num: that.goodData.num
          }
        });
      }
    },
    chose: function(item, index) {
      //选择规格
      this.sizeIndex = index;
      this.goodData.id = item.id;
      this.goodData.money = item.price;
      this.goodData.type = item.name;
    },
    add: function() {
      this.goodData.num++;
    },
    minus: function() {
      if (this.goodData.num > 1) {
        this.goodData.num--;
      }
    }
  },
  mounted() {
    const _this = this;
    // 调取微信jssdk
    this.$base.getWx(this.weixinApiList);
    //分享
    this.$base.share(this.shareParam);
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
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 3.62rem;
  z-index: -1;
}

.rightBox span {
  width: 0.48rem;
  height: 0.48rem;
  color: #999;
  border-radius: 0.12rem;
}

.cBox {
  padding: 0.1rem 0.2rem;
}

.active {
  background: #f49b1b;
  color: #fff;
}
</style>
