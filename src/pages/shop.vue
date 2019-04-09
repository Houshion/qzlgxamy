<!--商城 -->
<template>
  <div class='bigBox'>
    <div class='container' v-if="isData">
      <!-- banner -->
      <swiper :swiper="bannerlist"></swiper>
      <!-- <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in bannerlist">
              <img class="bannerImg" :src="item.imgurl" style="width: 100%;height: 3.62rem;" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div> -->
      <!-- 标题 -->
      <div class="flex-cfs p20">
        <img src="../assets/img/icon6.png" style="width:.44rem;height:.44rem;" alt="">
        <span class="ml20 f32">人气商品</span>
      </div>
      <!-- 商品列表 -->
      <div class="shop-container flex-csb r-wrap m20" v-if="goodData.length>0">
        <div class="shopBox br12 bg-ff flex-dcf mb20" style="width:3.5rem" v-for="(item,index) in goodData" @click="shopDetail(item.id)" :key="index">
          <img :src="item.picture" style="height:2.56rem;" alt="">
          <li class="mt20 ml20">{{item.name}}</li>
          <li class="m20 br">￥{{item.price}}</li>
        </div>
      </div>
      <div class="shopBox br12 bg-ff flex-dcc p20" @click="shopDetail(item)" v-else>
        <noData></noData>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../components/swiper";
import noData from "../components/noData";
export default {
  inject: ["reload"],
  data() {
    return {
      bannerlist: [],
      isData: 0,
      goodData: null
    };
  },
  components: {
    swiper,
    noData
  },
  computed: {},
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
  created() {
    let that = this;
    console.log(that);
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
    }, 800);
  },
  methods: {
    init: function() {
      //获取banner图和展示商品
      let that = this;
      that.isData = 1;
      that.$vux.loading.show();
      console.log(that.Http);
      that.Http.post("Wxsite/Mall/api", {
        api_name: "mall_home_page",
        type: 1
      }).then(res => {
        console.log(res.data.data);
        that.$vux.loading.hide();
        if (res.data.code == 1) {
          that.bannerlist = res.data.data.banner;
          that.goodData = res.data.data.goodsList;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    shopDetail: function(id) {
      console.log(id);
      this.reload();
      this.$router.push({
        path: "/shopDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
/* werr  */
</style>
