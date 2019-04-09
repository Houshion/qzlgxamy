<template>
  <div>
    <parent>
      <child :parentToChild="value1"></child>
    </parent>
  </div>
</template>
<script>
import wallet from "../pages/wallet";
export default {
  components: {
    wallet
  },
  data() {
    return {
      value1: "父组件的值传给子组件"
    };
  }
};
</script>