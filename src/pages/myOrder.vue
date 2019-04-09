<!--订单管理 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <group class="m20">
        <popup-picker title="场地选择" :show-name="true" :data="siteAddress" v-model="fieldValue" @on-change="changeSiteAddress"></popup-picker>
      </group>
      <group class="m20">
         <calendar @on-change="changeDate" v-model="timeValue" title="日期选择" show-popup-header popup-header-title="请选择日期" disable-future></calendar>
      </group>
      <div class="m20 bg-ff br12">
        <router-link :to="{path: '/myOrderDetail?id='+item.order_id}" class="list flex-csb p30 bb-e5" v-for="(item,index) in list" :key="index">
          <div class="flex-dcf">
            <span class="f30">{{item.device_name}}</span>
            <span class="c9 mt20">编号：{{item.order_no}}</span>
          </div>
          <span class="c-diy f33">￥{{item.real_money}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { PopupPicker, Group, Datetime, Cell, Calendar } from "vux";
import Vuex from "vuex"; //引用vuex
export default {
  data() {
    return {
      param: {
        api_name: "order",
        token: localStorage.getItem("token")
      },
      siteAddress: [], // 场地
      timeValue: "",
      fieldValue: [""],
      list: [
        {
          order_id: "1",
          macno: "2018072615252502", //编号
          order_no: "201811120938596110", //订单号
          real_money: "1.00", //实付金额
          time: "1541986739", //创建时间
          site_id: "1",
          device_name: "测试设备" //设备昵称
        }
      ]
    };
  },
  components: {
    PopupPicker,
    Group,
    Datetime,
    Cell,
    Calendar
  },
  computed: Vuex.mapState(["token"]),
  created() {
    let _this = this;
    _this.getOrder(_this.param);
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "site_list",
      token: localStorage.getItem("token")
    }).then(res => {
      let data = [];
      res.data.data.forEach(item => {
        data.push({ name: item.name, value: item.site_id });
      });
      _this.siteAddress.push(data);
    });
  },
  methods: {
    getOrder() {
      const _this = this;
      _this.Http.post("Wxsite/Wms/api", _this.param).then(res => {
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
        _this.list = res.data.data;
      });
    },
    changeSiteAddress(val) {
      const _this = this;
      _this.param.site_id = val[0];
      // delete _this.param.time;
      _this.getOrder();
    },
    changeDate(val) {
      const _this = this;
      _this.param.time = val;
      // delete _this.param.site_id;
      _this.getOrder();
    }
  }
};
</script>

<style scoped>
.list:last-child {
  border-bottom: 0;
}
</style>
