<template>
  <div id='scan'></div>
</template>

<script>
import { Loading } from "vux";
import wx from "weixin-js-sdk";
export default {
  name: "scan",
  data() {
    return {
      weixinApiList: ["scanQRCode"]
    };
  },

  components: { Loading },

  created() {
    const _this = this;
    _this.$vux.loading.show({
      text: "请稍候..."
    });
    _this.$base.getWx(_this.weixinApiList, function() {
      _this.$vux.loading.hide();
    });
  },

  mounted() {
    const _this = this;
    _this.$base.scan();
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>
