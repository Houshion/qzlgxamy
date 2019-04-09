<!--列表循环 -->
<template>
<div class='bigBox'>
<div class='container' v-if="isData">
    <div v-if="goodData.length>0">
        <solt>
            
        </solt>
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
      isData: null,
      goodData: []
    };
  },
  //   props:[
  //       isData,
  //       goodData
  //   ],
  components: {
    noData
  },
  computed: {},
  created() {
    let that = this;
    that.$vuex.that.init();
  },
  methods: {
    init: function() {
      console.log(1);
    }
  }
};
</script>
<style scoped>
</style>