<!--关于我们 -->
<template>
  <div class='bigBox' style="height:100vh;">
    <div class='container'>
      <div class="bg-ff m20 p20 br12 flex-dcc">
        <div class="flex-center mb20"><img :src="imgUrl" class="br12" style="height:3.2rem" alt=""></div>
        <div class="flex-center">{{content}}</div>
      </div>
    </div>
    <a class="mb20 flex-center c9" :href="'tel:' + phone">客服电话：{{phone}}</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      imgUrl: "",
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
    init: function() {
      let that = this;
      that.Http.post("Wxsite/User/api", {
        api_name: "about_us"
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.phone = res.data.data.phone;
          that.content = res.data.data.content;
          that.imgUrl = res.data.data.img;
        } else {
          that.vux.toast.text(res.data.msg, "center");
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
