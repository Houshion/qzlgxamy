<!--编辑 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="m20 bg-ff br12">
        <div class="flex-csb bb-e5 p20">
          <span>收货人姓名</span>
          <input type="text" class="ta-right" placeholder="请输入收货人姓名" v-model="name" />
        </div>
        <div class="flex-csb bb-e5 p20">
          <span>手机号码</span>
          <input type="text" class="ta-right" placeholder="请输入手机号码" v-model="phone" />
        </div>
        <div class="flex-csb bb-e5 p20" @click="choseArea">
          <span>所在地区</span>
          <ul class="flex-center">
            <span class="c9">{{address}}</span>
            <img src="../assets/img/arrow_icon.png" class="arrow_icon ml20" alt="">
          </ul>
        </div>
        <textarea class="p20 w100 flex-cfs" name="content" id="" cols="30" rows="5" v-model="detail" placeholder="请填写详细地址"></textarea>
        <div class="flex-cfs p20" @click="isMoren">
          <span class="circle" :class="{active:isChecked==1}"></span>
          <span class="c9 ml20">设为默认地址</span>
        </div>
      </div>
      <div class="bottom-fixed mb20">
        <div class="main_btn" @click="save">保存</div>
      </div>
      <x-address v-if="showAddress" title="请选择地址" :list="addressData" @on-shadow-change="onShadowChange" :show.sync="showAddress" v-model="addressVal"></x-address>
    </div>
  </div>
</template>

<script>
import { XAddress, Group, ChinaAddressV4Data } from "vux";

export default {
  inject: ["reload"],
  data() {
    return {
      isChecked: 0,
      name: "",
      phone: "",
      addressVal: [],
      addressId: [],
      detail: "",
      showAddress: false,
      addressData: ChinaAddressV4Data,
      address: "选择省、市、区",
      addresId: ""
    };
  },
  components: {
    Group,
    XAddress
  },
  computed: {},
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
      console.log(this.$route.query.id);
      let that = this;
      if (this.$route.query.id) {
        that.Http.post("Wxsite/User/api", {
          api_name: "address_check",
          id: that.$route.query.id
        }).then(res => {
          console.log(res.data.data);
          if (res.data.code == 1) {
            let addressArr = [];
            that.name = res.data.data.name;
            that.phone = res.data.data.mobile;
            that.detail = res.data.data.address;
            that.address =
              res.data.data.province_name +
              "," +
              res.data.data.city_name +
              "," +
              res.data.data.area_name;
            addressArr.push(
              res.data.data.province,
              res.data.data.city,
              res.data.data.area
            );
            that.addresId = addressArr;
            that.isChecked = res.data.data.is_default;
            console.log(that.addresId);
          }
        });
      }
    },
    choseArea: function() {
      this.showAddress = !this.showAddress;
    },
    isMoren: function() {
      this.isChecked = !this.isChecked;
      if (this.isChecked) {
        this.isChecked = 1;
      } else {
        this.isChecked = 0;
      }
    },
    onShadowChange(ids, names) {
      console.log(names, ids);
      this.address = names.join(" ");
      this.addresId = ids;
      console.log(...this.addressId);
    },
    save() {
      //新增地址
      let that = this;
      console.log(that.isChecked);
      console.log(that.$route.query.id);
      if (that.name == "") {
        that.$vux.toast.text("请输入姓名", "center");
      } else if (that.phone == "") {
        that.$vux.toast.text("请输入手机号码", "center");
      } else if (!checkMobileAndTel(that.phone)) {
        that.$vux.toast.text("请输入正确的手机号码", "center");
      } else if (that.addresId == "") {
        that.$vux.toast.text("请选择省、市、区", "center");
      } else if (that.detail == "") {
        that.$vux.toast.text("请输入详细地址", "center");
      } else {
        if (that.$route.query.id) {
          //修改
          that.Http.post("Wxsite/User/api", {
            api_name: "address_edit",
            name: that.name,
            id: that.$route.query.id,
            mobile: that.phone,
            is_default: that.isChecked,
            address: that.detail,
            zone_id: that.addresId.join(",")
          }).then(res => {
            console.log(res.data.data);
            if (res.data.code == 1) {
              show_load(that, res.data.msg);
              setTimeout(() => {
                that.$vux.loading.hide();
              }, 800);
              that.reload();
              this.$router.push({
                path: "/Address"
              });
            } else {
              that.$vux.toast.text(res.data.msg, "center");
            }
          });
        } else {
          //新增
          that.Http.post("Wxsite/User/api", {
            api_name: "add_address",
            name: that.name,
            mobile: that.phone,
            is_default: that.isChecked,
            address: that.detail,
            zone_id: that.addresId.join(",")
          }).then(res => {
            console.log(res.data.data);
            if (res.data.code == 1) {
              show_load(that, res.data.msg);
              setTimeout(() => {
                that.$vux.loading.hide();
              }, 800);
              that.reload();
              that.$router.push({
                path: "/Address"
              });
            } else {
              that.$vux.toast.text(res.data.msg, "center");
            }
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.active {
  background: url(~@/./assets/img/ic_gouxuan.png) no-repeat;
  background-size: 100% 100%;
  border: 0;
}
</style>
