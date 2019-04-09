<template>
  <div id='share' @click="closeMask">
    <div class="share"></div>
    <div class="img flex-dce">
      <img src="../assets/img/share.png" style="width:2.5rem;">
      <div>请点击右上角菜单分享给好友或朋友圈</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "share",
  props: ["touch"],
  data() {
    return {};
  },

  components: {},

  created() {
    const _this = this;
  },

  mounted() {
    const _this = this;
  },
  methods: {
    closeMask: function() {
      this.$emit("touch");
    }
  }
};
</script>
<style lang='less' scoped>
.share {
  height: 100%;
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
}
.img {
  position: fixed;
  top: 0;
  right: 0;
  font-weight: bold;
  color: #ffffff;
}
</style>
