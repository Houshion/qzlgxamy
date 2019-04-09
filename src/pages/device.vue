<!-- -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="m20 bg-ff br12 flex-csa p30">
        <div class="flex-dcc">
          <span class="f50 c1-diy">{{list.free}}</span>
          <li class="mt20 c9">空闲设备</li>
        </div>
        <div class="line"></div>
        <div class="flex-dcc">
          <span class="f50 c1-diy">{{list.busy}}</span>
          <li class="mt20 c9">使用中设备</li>
        </div>
        <div class="line"></div>
        <div class="flex-dcc">
          <span class="f50 c1-diy">{{list.ban}}</span>
          <li class="mt20 c9">停用设备</li>
        </div>
      </div>
      <div class="m20 bg-ff br12 flex-csb p30" v-for="(item,index) in list.device" @click="detail(item.device_id)" :key="index">
        <ul class="flex-dcf">
          <span class="f42">{{item.address}}</span>
          <span class="c9 mt20">编号：{{item.macno}}</span>
        </ul>
        <span :class="item.is_online==1?'c-diy':item.is_online==2?'c1':'c2'">{{item.is_online_str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          device_id: "1", //设备id
          macno: "2018072615252502", //设备编码
          address: "迪尔西", //安装地址
          is_online: "3", //状态
          is_online_str: "停用",
          status: 2
        }
      ],
      deviceCount: {
        free: "0", //空闲设备统计
        busy: "1", //忙碌设备统计
        ban: "1" //停用设备统计
      }
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "device",
      token: localStorage.getItem("token")
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
      _this.list = res.data.data;
      // _this.data = res.data.data;
    });
  },
  methods: {
    detail: function(id) {
      this.$router.push({
        name: "deviceDetail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>

<style scoped>
.line {
  width: 1px;
  height: 1rem;
  background: #f8e5d3;
}
.c1 {
  color: #46d9c2;
}
.c2 {
  color: #f75e5e;
}
</style>
