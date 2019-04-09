<!--提现申请 -->
<template>
  <div class='bigBox p30'>
    <div class="bg-ff flex-csb p30 br12 mt30">
      <span>可提现金额</span>
      <span class="c-diy f33">￥ {{money}}</span>
    </div>
    <group>
      <x-input class="p30i" type="tel" required text-align="right" title="提现金额" v-model="data.money" placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input class="p30i" text-align="right" title="收款人姓名" v-model="data.name" required placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input class="p30i" required :is-type="(checkIdCode)" text-align="right" title="身份证号码" v-model="data.id_card" placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input class="p30i" text-align="right" title="银行卡名称" v-model="data.bank_name" required placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input class="p30i" required :is-type="(checkBank)" text-align="right" title="银行卡号" v-model="data.bank_card" placeholder="请输入"></x-input>
    </group>
    <group>
      <x-input class="p30i" text-align="right" title="开户支行名称" v-model="data.open_card_name" required placeholder="请输入"></x-input>
    </group>
    <div class="main_btn" @click="check">提交</div>
  </div>
</template>

<script>
import { AlertModule, XInput, Group } from "vux";
export default {
  data() {
    return {
      money: this.$route.query.money,
      data: {
        api_name: "draw",
        token: localStorage.getItem("token"),
        money: "",
        name: "",
        id_card: "",
        bank_name: "",
        bank_card: "",
        open_card_name: ""
      }
    };
  },
  components: {
    AlertModule,
    XInput,
    Group
  },
  computed: {},
  created() {
    let that = this;
  },
  methods: {
    // 检验状态
    check: function() {
      const _this = this;
      _this.data.money
        ? _this.data.name
          ? _this.data.id_card
            ? _this.data.bank_name
              ? _this.data.bank_card
                ? _this.data.open_card_name
                  ? _this.submit()
                  : _this.showAlert("开户支行名称不能为空")
                : _this.showAlert("银行卡号不能为空")
              : _this.showAlert("银行卡名称不能为空")
            : _this.showAlert("身份证号码不能为空")
          : _this.showAlert("收款人姓名不能为空")
        : _this.showAlert("收款金额不能为空");
    },
    submit: function() {
      const _this = this;
      _this.Http.post("Wxsite/Wms/api", _this.data).then(res => {
        if (res.data.code == 1) {
          _this.showAlert("申请已提交", "", function() {
            _this.$router.go(-1);
          });
        }
        // 账号在其他设备登录，强制跳出重新登录
        else if (res.data.code == 101) {
          _this.$vux.toast.show({
            type: "text",
            text: "账号在其他设备登录，为避免损失请修改密码并重新登录",
            position: "center",
            time: 3000
          });
          _this.$router.push({ path: "./login" });
        } else {
          _this.showAlert(res.data.msg, "失败");
        }
      });
    },
    // 调用Alert弹出框
    showAlert(content, title, callback) {
      AlertModule.show({
        title: title ? title : "提示",
        content: content,
        onHide() {
          callback ? callback() : "";
        }
      });
    },
    checkBank(value) {
      var status = /^(\d{16}|\d{19})$/.test(value);
      return { valid: status, msg: "银行卡号有误" };
    },
    checkIdCode(value) {
      var userCardreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      var taiwanreg = /^[A-Z][0-9]{9}$/; //台湾
      var xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/; //香港
      var aomenreg = /^[157][0-9]{6}\([0-9]\)$/; //澳门
      return {
        valid:
          userCardreg.test(value) ||
          taiwanreg.test(value) ||
          xianggangreg.test(value) ||
          aomenreg.test(value),
        msg: "身份证号码有误"
      };
    }
  }
};
</script>

<style scoped lang="less">
.bigBox {
  padding-top: 0 !important;
}
.p30i {
  padding: 0.3rem !important;
  border: none !important;
  border-radius: 0.12rem !important;
  input {
    text-align: right;
  }
}
</style>
