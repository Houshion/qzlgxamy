<!--个人信息 -->
<template>
  <div class="bigBox">
    <div class="container">
      <div class="m20 p30 br12 flex-csb bg-ff">
        <span>头像</span>
        <label class="flex-center">
          <input type="file" class="head_img" hidden @change="changeImg" accept="image/*">
          <img :src="logo" class="br12" alt style="width:1.4rem;">
          <img src="../assets/img/arrow_icon.png" class="arrow_icon ml20" alt>
        </label>
      </div>
      <div class="m20 p30 br12 flex-csb bg-ff" @click="changeName">
        <span>昵称</span>
        <ul class="flex-center">
          <span class="c9">{{nickName}}</span>
          <img src="../assets/img/arrow_icon.png" class="arrow_icon ml20" alt>
        </ul>
      </div>
      <div class="m20 p30 br12 flex-csb bg-ff" @click="changePhone">
        <span>手机号码</span>
        <ul class="flex-center">
          <span class="c9">{{phone}}</span>
          <img src="../assets/img/arrow_icon.png" class="arrow_icon ml20" alt>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      logo: "",
      nickName: "",
      phone: ""
    };
  },
  components: {},
  computed: {},
  created() {
    let that = this;
    that.init();
  },
  methods: {
    // 初始化
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "user_info"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.logo = res.data.data.head_img;
          that.nickName = res.data.data.nickname;
          that.phone = res.data.data.mobile;
        } else {
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    changeName: function() {
      let that = this;
      that.$vux.confirm.show({
        title: "请输入昵称",
        content: "Content",
        showInput: "true",
        onConfirm(msg) {
          if (msg == "") {
            that.$vux.toast.text("请输入昵称", "center");
          } else {
            that.nickName = msg;
            that.Http.post("Wxsite/User/api", {
              api_name: "user_edit",
              type: "2",
              nickname: that.nickName
            }).then(res => {
              if (res.data.code == 1) {
                console.log(res.data.msg);
                that.$vux.toast.text(res.data.msg, "center");
              } else {
                that.$vux.toast.text(res.data.msg, "center");
              }
            });
          }
        }
      });
    },
    getObjectURL: function(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    changeImg: function(e) {
      // 上传照片
      var that = this;
      let file = e.target.files[0];
      console.log(file);
      that.$vux.loading.show();
      /* eslint-disable no-undef */
      let param = new FormData(); // 创建frm对象
      param.append("img", file, file.name); // 通过append向form对象添加数据
      param.append("api_name", "user_edit");
      param.append("type", 1);
      console.log(param.get("file")); // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function(evt) {
        //console.log(evt.target)
        that.logo = evt.target.result;
      };
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      // 添加请求头
      axios
        .post(
          "http://qzlgxamy.app.xiaozhuschool.com/Wxsite/User/api",
          param,
          config
        )
        .then(response => {
          that.$vux.loading.hide();
          console.log(response.data);
        });
    },
    changePhone: function() {
      let that = this;
      that.$vux.confirm.show({
        title: "请输入手机号码",
        content: "Content",
        showInput: "true",
        onConfirm(msg) {
          if (msg == "") {
            that.$vux.toast.text("请输入手机号码", "center");
          } else if (!checkMobileAndTel(msg)) {
            that.$vux.toast.text("手机号码格式有误", "center");
          } else {
            that.phone = msg;
            that.Http.post("Wxsite/User/api", {
              api_name: "user_edit",
              type: "3",
              mobile: that.phone
            }).then(res => {
              console.log(res.data.data);
              if (res.data.code == 1) {
                console.log(res.data.msg);
                that.$vux.toast.text(res.data.msg, "center");
              } else {
                that.$vux.toast.text(res.data.msg, "center");
              }
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
</style>
