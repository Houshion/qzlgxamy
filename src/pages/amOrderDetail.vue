<!--按摩详情 -->
<template>
<div class='bigBox'>
<div class='container'>
     <div class="m20 bg-ff flex-csb p30">
    <span>设备编号</span>
    <span class="c9">{{detailInfo.macno}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>套餐</span>
    <span class="c9">{{detailInfo.name}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>付款时间</span>
    <span class="c9">{{detailInfo.pay_time|timeStr('Y-m-d H:i:s')}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>开始时间</span>
    <span class="c9">{{detailInfo.start_time|timeStr('Y-m-d H:i:s')}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>结束时间</span>
    <span class="c9">{{detailInfo.end_time|timeStr('Y-m-d H:i:s')}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>需付</span>
    <span class="c9">￥{{detailInfo.should_money}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>优惠券金额</span>
    <span class="c9">￥{{detailInfo.coupon_money | toFixed(2)}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>抵扣金额</span>
    <span class="c9">￥{{detailInfo.offset_money}}</span>
  </div>
   <div class="m20 bg-ff flex-csb p30">
    <span>实付</span>
    <span class="c9">￥{{detailInfo.real_money}}</span>
  </div>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      detailInfo: {}
    };
  },
  components: {},
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "order_info",
        order_id: that.$route.query.id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.detailInfo = res.data.data;
          console.log(that.detailInfo);
        } else {
          that.$vux.toast.text(res.data.data.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
