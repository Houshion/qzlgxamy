<!--按摩椅订单 -->
<template>
  <div class='bigBox'>
    <div class='container' v-if="isData">
      <div v-if="list.length>0">
        <div class="m20 br12 bg-ff flex-csb p20" v-for="(item,index) in list" :key="index" @click="detail(item)">
          <ul class="flex-dcf">
            <li class="f32">{{item.name}}</li>
            <li class="c9 mt20">{{item.ctime|timeStr('Y-m-d H:i:s')}}</li>
          </ul>
          <span class="c-diy f44">-{{item.real_money}}</span>
        </div>
      </div>
      <div class="p30" v-else>
        <noData></noData>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "../components/noData";
export default {
  data() {
    return {
      list: [],
      isData: 0
    };
  },
  components: {
    noData
  },
  computed: {},
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.init();
    }, 800);
  },
  methods: {
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "order_list"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.list = res.data.data;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    detail: function(item) {
      this.$router.push({
        path: "/amOrderDetail",
        query: {
          id: item.order_id
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
