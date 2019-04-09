<!--设备详情 -->
<template>
<div class='bigBox'>
<div class='container'>
  <div class="m20 bg-ff flex-csb p30">
    <span>设备名称</span>
    <span class="c9">{{data.info.title}}</span>
  </div>
  <div class="m20 bg-ff flex-csb p30">
    <span>设备编号</span>
    <span class="c9">{{data.info.macno}}</span>
  </div>
  <div class="m20 bg-ff flex-csb p30">
    <span>区域名称</span>
    <span class="c9">{{data.site_name}}</span>
  </div>
  <div class="m20 bg-ff flex-csb p30">
    <span>设备状态</span>
    <span class="c9">{{data.is_online}}</span>
  </div>
  <div class="m20 bg-ff flex-csb p30">
    <span>设备地址</span>
    <span class="c9">{{data.info.address}}</span>
  </div>
  <div class="m20 bg-ff flex-csb p30">
    <span>添加时间</span>
    <span class="c9">{{data.info.ctime | timeStr("Y-m-d H:i")}}</span>
  </div>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "device_info",
      token: localStorage.getItem("token"),
      device_id: _this.$route.query.id
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
    });
  },
  methods: {
    init: function() {
      // console.log(1);
    }
  }
};
</script>
<style scoped>
</style>
