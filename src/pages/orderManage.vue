<!--订单管理 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div class="m20 bg-ff br12">
        <div class="list flex-csb p30 bb-e5" v-for="(item,index) in list">
          <div class="flex-dcf">
            <span class="c9">{{item.title}}</span>
            <span class="f30 mt20">编号：{{item.id}}</span>
          </div>
          <div class="flex-dce">
            <span class="c9">使用次数：{{item.number}}次</span>
            <span class="f30 mt20">收入:￥{{item.money|toFixed(2)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [{
            title: "高盛科技大厦",
            number: "15",
            id: "65894526",
            money: "625"
          },
          {
            title: "高盛科技大厦",
            number: "15",
            id: "65894526",
            money: "625"
          },
          {
            title: "高盛科技大厦",
            number: "15",
            id: "65894526",
            money: "625"
          },
          {
            title: "高盛科技大厦",
            number: "15",
            id: "65894526",
            money: "625"
          }
        ]
      };
    },
    components: {},
    computed: {},
    created() {
      let that = this;
      that.init;
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
