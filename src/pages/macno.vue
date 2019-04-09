<!--我的设备 -->
<template>
  <div class='bigBox'>
    <div class='container'>
      <div id="ddd">
        <div id="img-group">
          <div class="img-item" v-for="item in imgArr">
            <img :src="item.src" alt="">
          </div>
        </div>
        <div class="add-pic" @click="addPic()" v-show="picFlag">+
          <input name="files" id="uploaderInput" type="file" accept="image/*" multiple/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: [],
      picFlag: true
    };
  },
  components: {},
  computed: {},
  created() {
    let that = this;
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    addPic() {
      var vm = this;
      var input = $("#uploaderInput");
      input.unbind("change").on("change", function(e) {
        var files = input[0].files;
        if (files.length == 6) vm.picFlag = false;
        for (var i = 0; i < files.length; i++) {
          var reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = function() {
            if (vm.imgArr.length < 6) {
              vm.imgArr.push({ src: this.result });
            }
            if (vm.imgArr.length == 6) vm.picFlag = false;
            if (vm.imgArr.length > 6) {
              Toast({
                message: "您最多上传六张站点图片",
                position: "bottom",
                duration: 2000
              });
              vm.picFlag = false;
            }
          };
        }
      });
    }
  }
};
</script>

<style scoped>
.hide {
  display: none;
}

.img-item {
  width: 4.4rem;
  height: 3.75rem;
  float: left;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

.img-item img {
  width: 100%;
  height: 100%;
}
.active-pic {
  font-size: 0.6rem;
  color: #9b9b9b;
  padding: 0 1rem 0 1.5rem;
  margin-top: 1rem;
}

.add-pic {
  background: #f3f3f3;
  width: 4.4rem;
  height: 3.75rem;
  float: left;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  text-align: center;
  font-size: 2rem;
  line-height: 3.5rem;
  color: #979797;
  position: relative;
}

.add-pic input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 0;
}
</style>
