<!--优惠券 -->
<template>
  <div class='bigBox'>
    <div class='container' v-if="isData">
      <div v-if="coupon.length>0">
        <div class="m20 br12 bg-ff flex-csb of-hidden" style="heigth:2.2rem;" v-for="(item,index) in coupon" :key="index">
          <ul class="flex-dcf p30">
            <li :class="item.state?'f44 c9':'f44 brown'">{{item.state?'已使用':'未使用'}}</li>
            <li class="c9 mt60 f25">有效日期：{{item.ctime|timeStr('Y-m-d')}}-{{item.etime|timeStr('Y-m-d')}}</li>
          </ul>
          <div :class="item.state?'used rightBox flex-center p-r':'rightBox flex-center p-r p30 noUsed'">
            <img class="p-a" src="../assets/img/img2.png" style="width:.12rem;left:-.05rem" alt="">
            <div style="display:inline-block;vertical-align: bottom;">
              <span class="f100">{{item.offset_money|toFixed(0)}}</span>
              <span>元</span>
            </div>
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
export default {
  data() {
    return {
      isData: 0,
      coupon: [
        // {
        //   state: false,
        //   dateArea: "2018/1/8-2018/2/8",
        //   money: 3
        // },
        // {
        //   state: true,
        //   dateArea: "2018/1/8-2018/2/8",
        //   money: 3
        // },
        // {
        //   state: false,
        //   dateArea: "2018/1/8-2018/2/8",
        //   money: 3
        // }
      ]
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
        api_name: "my_coupon"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.$vux.loading.hide();
          that.isData = 1;
          that.coupon = res.data.data;
          that.coupon.forEach((item, index) => {
            item.state = 0;
          });
          console.log(that.coupon);
          // that.coupon.forEach((item, index) => {
          //   item.etime = format(item.etime, "Y-m-d");
          // });
        } else {
          that.vux.toast.text(res.data.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
.brown {
  font-size: 0.44rem;
  color: #8f6a28;
}

.rightBox {
  width: 2.2rem;
  height: 2.2rem;
  color: #8f6a28;
}

.noUsed {
  background: linear-gradient(top, #fee26d, #f6a527)!important;
  background: -webkit-linear-gradient(top, #fee26d, #f6a527)!important;
}

.used {
  background: linear-gradient(top, #ddddde, #9c9b9b);
  background: -webkit-linear-gradient(top, #ddddde, #9c9b9b);
}
</style>
