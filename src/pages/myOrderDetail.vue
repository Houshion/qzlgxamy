<!--订单详情 -->
<template>
  <div class='bigBox' v-show="show">
    <div class='container'>
      <div class="m20 bg-ff br12">
        <li class="flex-csb p30 bb-e5">
          <span class="c9">订单编号</span>
          <span>{{data.order.order_no}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">设备编号</span>
          <span>{{data.order.macno}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">设备名称</span>
          <span>{{data.device_name}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">使用套餐</span>
          <span>{{data.item}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">使用的优惠券</span>
          <span>{{data.coupon_name ? data.coupon_name : "未使用优惠券"}}</span>
        </li>
        <li class="flex-csb p30 bb-e5" v-if="data.order.offset_money != '0.00'">
          <span class="c9">抽奖抵扣金额</span>
          <span>{{data.order.offset_money}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">使用时段</span>
          <span>
            <div>{{data.order.start_time | timeStr("Y-m-d H:i")}}</div>
            <div style="text-align:center">~</div>
            <div>{{data.order.end_time | timeStr("Y-m-d H:i")}}</div>
          </span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">用户昵称</span>
          <span>{{data.user_name}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">应付金额</span>
          <span>{{data.order.should_money}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">实付金额</span>
          <span>{{data.order.real_money}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">支付方式</span>
          <span>{{data.paytype_name}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">状态</span>
          <span>{{data.status_name}}</span>
        </li>
        <li class="flex-csb p30 bb-e5">
          <span class="c9">创建时间</span>
          <span>{{data.order.ctime | timeStr("Y-m-d H:i")}}</span>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        order: {
          order_id: "1",
          user_id: "1",
          order_no: "201811120938596110", //订单编号
          trade_no: "",
          dealer_id: "0",
          site_id: "1",
          agent_id: "1",
          macno: "2018072615252502", //设备编号
          item_id: "1",
          minute: "0.0",
          start_time: "0", //开始时间
          end_time: "0", //结束时间
          should_money: "1.00", //应付金额
          offset_money: "0.00",
          real_money: "1.00", //实付金额
          coupon_id: "1",
          paytype: "2",
          status: "2",
          refund: "0",
          pay_time: "0",
          ctime: "1541986739" //创建时间
        },
        item: "测试套餐", //套餐名称
        user_name: "Lar", //用户名称
        device_name: "测试设备", //设备名称
        coupon_name: "便宜1块", //优惠券名称
        paytype_name: "微信", //付款方式
        status_name: "已完成" //状态
      },
      show: false
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "order_info",
      token: localStorage.getItem("token"),
      order_id: _this.$route.query.id
    }).then(res => {
      // 账号在其他设备登录，强制跳出重新登录
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
      _this.show = true;
    });
  },
  methods: {}
};
</script>

<style scoped>
</style>
