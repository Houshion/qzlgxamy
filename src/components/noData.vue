<!--暂无数据 -->
<template>
  <div class="noData flex-dcc bg-ff p20">
    <img src="../assets/img/noImg.jpg" style="width:1.95rem;" alt="">
    <span class="mt20">暂无数据</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {},
    created() {
      let that = this;
      that.init();
    },
    methods: {
      init: function() {}
    }
  };
</script>

<style scoped>

</style>
