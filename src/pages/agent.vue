<template>
  <div id='agent' class="p30">
    <group>
      <x-input class="p30i" text-align="right" title="联系人" v-model="data.name" required placeholder="请输入联系人"></x-input>
    </group>
    <group>
      <x-input class="p30i" type="tel" is-type="china-mobile" text-align="right" title="联系方式" v-model="data.mobile" required placeholder="请输入联系方式"></x-input>
    </group>
    <group>
      <x-address title="城市" v-model="address"  placeholder="请选择地址" :list="addressData" @on-shadow-change="selectCity"></x-address>
    </group>
    <group>
      <x-textarea :max="200" placeholder="请输入您想备注的其他内容..." required v-model="data.content"></x-textarea>
    </group>
    <div class="main_btn" @click="check">提交</div>
  </div>
</template>

<script>
import {
  AlertModule,
  XInput,
  Group,
  XTextarea,
  XAddress,
  ChinaAddressV4Data
} from "vux";
export default {
  data() {
    return {
      data: {
        api_name: "apply",
        name: "",
        mobile: "",
        content: "",
        province: "",
        city: "",
        area: ""
      },
      address: [],
      addressData: ChinaAddressV4Data
    };
  },
  components: {
    AlertModule,
    XInput,
    Group,
    XTextarea,
    XAddress
  },
  created() {
    const _this = this;
  },
  methods: {
    check: function() {
      const _this = this;
      _this.data.name
        ? _this.data.mobile
          ? _this.data.content
            ? _this.address.length > 0
              ? _this.submit()
              : _this.showAlert("请选择城市")
            : _this.showAlert("备注不能为空")
          : _this.showAlert("联系方式不能为空")
        : _this.showAlert("联系人不能为空");
    },
    selectCity: function(ids, names) {
      const _this = this;
      _this.data.province = names[0];
      _this.data.city = names[1];
      _this.data.area = names[2];
    },
    submit: function() {
      const _this = this;
      console.log(_this.data);
      _this.Http.post("Wxsite/User/api", _this.data).then(res => {
        if (res.data.code == 1) {
          _this.showAlert("申请已提交", "", function() {
            _this.$router.go(-1);
          });
        } else {
          _this.showAlert(res.data.msg, "失败");
        }
      });
    },
    showAlert(content, title, callback) {
      AlertModule.show({
        title: title ? title : "提示",
        content: content,
        onHide() {
          callback ? callback() : "";
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.p30i {
  padding: 0.3rem !important;
  border: none !important;
  border-radius: 0.12rem !important;
  input {
    text-align: right;
  }
}
</style>
