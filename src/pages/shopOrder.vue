<!--商品订单 -->
<template>
  <div class='bigBox' v-if="isData">
    <div class="bg-ff m20 br12 menu flex-csa">
      <span :class="item.state==isChose?'active p20':'p20'" v-for="(item,index) in menu" :key="index" @click="menuChange(item,index)">{{item.title}}</span>
    </div>
    <div class='container' v-if="isData">
      <div v-if="shopData.length>0">
      <div class="bg-ff m20 p20 br12" v-for="(item,index) in shopData" @click="detail(item)" :key="index"> 
        <li class="flex-csb bb-e5 pb20">
          <span class="c9">{{item.ctime}}</span>
          <span class="c9 c-diy">{{item.status_}}</span>
        </li>
        <div class="bb-e5 ptb20 flex-csb" v-for="(i,index2) in Array(item.goods_data)" :key="index2">
          <ul class="flex-cfs">
            <img class="b-e5" :src="i.picture" style="width:1.8rem;" alt="">
            <div class="flex-cfs">
              <div class="flex-dcf ml20">
                <li>{{i.name}}</li>
                <li class="c9 mt20">{{i.spec_name}}</li>
              </div>
            </div>
          </ul>
          <div class="flex-dce">
            <li>￥{{i.price| toFixed(2)}}</li>
            <li class="c9 mt40">x{{item.goods_num}}</li>
          </div>
        </div>
        <div class="flex-cfe ptb20">
          共{{item.goods_num}}件商品<span class="ml40">合计：￥{{item.pay_price}}</span>
        </div>
        <div class="flex-cfe bt-e5 ptb20" v-if="item.status==0">
          <span class="c_circle flex-center b-e5">取消订单</span><span class="c_circle flex-center bg-diy cf ml20">立即付款</span>
        </div>
        <div class="flex-cfe ptb20 bt-e5" v-else-if="item.status==2">
          <span class="c_circle flex-center bg-diy cf ml20">确认收货</span>
        </div>
        <div v-else>
        </div>
      </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
  </div>
</template>

<script>
import noData from "../components/noData";
import MeScroll from "mescroll.js";
import "mescroll.js/mescroll.min.css";
export default {
  inject: ["reload"],
  data() {
    return {
      isChose: 0,
      isData: 0,
      menu: [
        {
          state: 0,
          title: "全部"
        },
        {
          state: 99,
          title: "待付款"
        },
        {
          state: 2,
          title: "待确认"
        },
        {
          state: 3,
          title: "已完成"
        }
      ],
      shopData: []
    };
  },
  components: {
    noData
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
  created() {
    let that = this;
    that.$vux.loading.show();
    window.setTimeout(function() {
      that.getOrderList();
    }, 800);
  },
  methods: {
    getOrderList: function(status) {
      let that = this;
      that.Http.post("Wxsite/Mall/api", {
        //获取订单列表
        api_name: "get_order_list",
        status: status
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.shopData = res.data.data;
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    },
    detail: function(item) {
      this.reload();
      this.$router.push({
        path: "/shopOrderDetail",
        query: {
          id: item.id
        }
      });
    },
    menuChange: function(item, index) {
      let that = this;
      that.isChose = item.state;
      that.getOrderList(item.state);
    }
  }
};
</script>

<style scoped>
.menu .active {
  border-bottom: 2px solid #f49b1b;
}

.c_circle {
  width: 1.58rem;
  height: 0.6rem;
  border-radius: 50px;
}
</style>
