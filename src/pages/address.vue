<!--地址管理 -->
<template>
  <div class='bigBox' v-show="finish">
    <div class='container'>
      <div v-if="list.length>0">
        <div class="m20 bg-ff br12 p20" v-for="(item,index) in list" :key="index" @click="choseAddress(item)">
          <li class="flex-csb">
            <span>{{item.name}}</span>
            <span>{{item.mobile}}</span>
          </li>
          <li class="mt20 c9 pb20 bb-e5">{{item.province+'省'+item.city+item.area+item.address}}</li>
          <li class="mt20 c9 flex-csb">
            <div class="flex-center" @click="setDefault(item.id)">
            <span class="circle" :class="{active:choseId==item.id}"></span>
            <span class="c9 ml20">设为默认地址</span>
          </div>
            <div class="flex-cfe">
              <div class="edit flex-center" @click="edit(item,index)">
                <img src="../assets/img/ic_deit.png" style="width:.28rem;height:.28rem;" alt="">
                <span class="ml20">编辑</span>
              </div>
              <div class="edit flex-center ml50" @click="del(item,index)">
                <img src="../assets/img/ic_del.png" style="width:.28rem;height:.28rem;" alt="">
                <span class="ml20">删除</span>
              </div>
            </div>
          </li>
        </div>
      </div>
      <div v-else>
        <noData></noData>
      </div>
    </div>
    <router-link to="/Edit" class="flex-center p20 m20 br12 cf bg-diy">添加新地址</router-link>
  </div>
</template>

<script>
import noData from "../components/noData";
export default {
  inject: ["reload"],
  data() {
    return {
      show: true,
      choseId: null,
      finish: false,
      list: [
        // {
        //   name: "小小鱼1",
        //   mobile: "158168xxxxx",
        //   addr: "河南省焦作市山阳区新城街道一体化示范区宏图路中 心幼儿园",
        //   state: 0
        // },
        // {
        //   name: "小小鱼2",
        //   phone: "158168xxxxx",
        //   addr: "河南省焦作市山阳区新城街道一体化示范区宏图路中 心幼儿园",
        //   state: 0
        // },
        // {
        //   name: "小小鱼3",
        //   phone: "158168xxxxx",
        //   addr: "河南省焦作市山阳区新城街道一体化示范区宏图路中 心幼儿园",
        //   state: 0
        // },
        // {
        //   name: "小小鱼4",
        //   phone: "158168xxxxx",
        //   addr: "河南省焦作市山阳区新城街道一体化示范区宏图路中 心幼儿园",
        //   state: 0
        // }
      ]
    };
  },
  computed: {},
  components: {
    noData
  },
  created() {
    let that = this;
    that.init();
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
  methods: {
    init: function() {
      let that = this;
      console.log(that.Http);
      that.Http.post("Wxsite/User/api", {
        api_name: "address_list"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.finish = true;
          that.list = res.data.data;
          res.data.data.forEach((item, index) => {
            if (item.is_default == 1) {
              that.choseId = item.id;
            }
          });
          console.log(that.choseId);
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    edit: function(item, index) {
      this.reload();
      this.$router.push({
        path: "/Edit",
        query: {
          id: item.id
        }
      });
    },
    del: function(item, index) {
      console.log(item.id);
      let that = this;
      that.$vux.confirm.show({
        title: "确定要删除吗？",
        onConfirm() {
          that.list.splice(index, 1);
          that.Http.post("Wxsite/User/api", {
            api_name: "delete_address",
            id: item.id
          }).then(res => {
            console.log(res.data.data);
            if (res.data.code == 1) {
              that.list = res.data.data;
              show_load(that, res.data.msg);
              setTimeout(() => {
                that.$vux.loading.hide();
              }, 800);
              location.reload();
            } else {
              that.$vux.toast.text(res.data.msg, "center");
            }
          });
        }
      });
    },
    onConfirm(msg) {
      console.log(msg);
      if (msg) {
        // alert(msg);
      }
    },
    setDefault(id) {
      let that = this;
      that.choseId = id;
      console.log(id);
      that.Http.post("Wxsite/User/api", {
        api_name: "set_default",
        id: id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          show_load(that, "设置成功");
          setTimeout(() => {
            that.$vux.loading.hide();
          }, 800);
          // location.reload();
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    choseAddress(item) {
      let that = this;
      if (that.$route.query.spec_id) {
        that.reload();
        that.$router.push({
          path: "/shopConfirm",
          query: {
            spec_id: that.$route.query.spec_id,
            num: that.$route.query.num,
            addr_id: item.id
          }
        });
      }
      console.log(item);
    }
  }
};
</script>

<style scoped>
.active {
  background: url("~@/./assets/img/ic_gouxuan.png") no-repeat;
  background-size: 100% 100%;
  border: 0;
}
</style>
