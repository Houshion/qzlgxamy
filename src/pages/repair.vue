<!--我要报障 -->
<template>
  <div class='bigBox bg-ff'>
    <div class='container'>
      <div class="m20 p20 c-diy flex-center box-shadow1">设备编号：{{data.macno}}</div>
      <div class="p20 f40 fw-bold">选择问题类型</div>
      <div class="flex-cfs r-wrap">
        <div class="cBox" :class="{active:isChose==index}" v-for="(item,index) in list" @click="chose(index)" :key="index">{{item.name}}</div>
      </div>
      <div class="m20 bg-f5 br12 p20 flex-dcf">
        <textarea style="width:100%;" name="" id="" cols="30" rows="5" placeholder="问题补充描述" v-model="data.content"></textarea>
        <!-- <div class="pic">
              <img src="../assets/img/pic.png" style="width:1.28rem;height:1.28rem;" alt="">
            </div> -->
        <form>
          <div class="pic">
            <div class="comment-photo">
              <div class="inline-block" id="pic_box">
                <!-- <label v-for="(item,index) in imgList" v-if="imgList.length>0" :key="index">
                    <input type="file" hidden="hidden" name="backpics[]" @change="fileChange($event)">
                    <div class="isImg" style="height: 100%">
                      <img :src="item.file.src" style="height: 100%; width: 100%;">
                      <button class="removeBtn"  @click="fileDel(index)">x</button>
                    </div>
                  </label> -->
                <label>
                    <input name="file" type="file" accept="image/*" @change="update" hidden/>
                    <div class="isImg" style="height: 100%" v-show="!show">
                      <img :src="imgs" style="height: 100%; width: 100%;">
                    </div>
                  </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="main_btn" @click="submitBtn">提交</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isChose: 0,
      imgList: [],
      imgLength: 3,
      list: [],
      data: {
        api_name: "feedback",
        macno: this.$route.query.macno,
        type_id: "",
        content: "",
        img: ""
      },
      imgs: "",
      show: true,
      param: ""
    };
  },
  components: {},
  computed: {},
  created() {
    let _this = this;
    _this.Http.post("Wxsite/User/api", {
      api_name: "get_fault_type",
      macno: this.$route.query.macno
    }).then(res => {
      _this.list = res.data.data.list;
      _this.data.type_id = res.data.data.list[0].id;
    });
  },
  mounted() {
    const _this = this;
  },
  methods: {
    // changeType: function() {},
    // getContent: function() {
    //   const _this = this;
    //   _this.param.append("content", _this.data.content); // 通过append向form对象添加数据
    //   console.log(_this.param.get("content"));
    // },
    removeImg: function() {
      console.log(1);
    },
    update(e) {
      // 上传照片
      const _this = this;
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function(evt) {
        //console.log(evt.target)
        _this.imgs = evt.target.result;
        _this.data.img = file;
        _this.show = false;
      };
    },
    // 选中并修改保障类型
    chose: function(index) {
      this.isChose = index;
      this.data.type_id = this.list[index].id;
    },
    submitBtn: function() {
      const _this = this;

      console.log(_this.data);

      if (_this.data.content == "")
        return _this.$vux.toast.text("问题描述不能为空", "center");
      if (_this.data.img == "")
        return _this.$vux.toast.text("图片不能为空", "center");
      // 添加formData并将数据写入其中
      /* eslint-disable no-undef */
      let param = new FormData(); // 创建form对象
      param.append("api_name", _this.data.api_name);
      param.append("macno", _this.data.macno); // 通过append向form对象添加数据
      param.append("type_id", _this.data.type_id); // 通过append向form对象添加数据
      param.append("content", _this.data.content); // 通过append向form对象添加数据
      param.append("img", _this.data.img); // 通过append向form对象添加数据

      _this.$vux.loading.show({
        text: "请稍候..."
      });
      // 添加请求头
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post(
          "http://qzlgxamy.app.xiaozhuschool.com/Wxsite/User/api",
          param,
          config
        )
        .then(res => {
          // _this.feedbackMsg.img = res.data.data.img_url;
          _this.$vux.loading.hide();
          _this.$vux.toast.text(res.data.msg, "center");
          setTimeout(() => {
            _this.$router.go(-1);
          }, 1500);
        });
    }
  }
};

function lookBigImg(obj) {
  console.log(obj);
}
</script>

<style scoped>
.cBox {
  padding: 0.2rem 0.3rem;
  border-radius: 50px;
  background: #eee;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
}

.active {
  background: #f49b1b;
  color: #fff;
}

.comment-photo label {
  display: inline-block;
  width: 1.28rem;
  height: 1.28rem;
  background: url(~@/./assets/img/pic.png) no-repeat;
  background-size: 100% 100%;
  float: left;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}

.shade {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.55);
}

.shade div {
  width: 6rem;
  height: 4rem;
  line-height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2rem;
  margin-left: -3rem;
  background: white;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
}

.shadeImg {
  position: absolute;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 15;
  text-align: center;
  background: rgba(0, 0, 0, 0.55);
}

.showImg {
  width: 225px;
}

.isImg {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.removeBtn {
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  font-size: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
