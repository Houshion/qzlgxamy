<!--收入统计 -->
<template>
  <div class="bigBox">
    <div class="container">
      <!-- 菜单 -->
      <div class="m20 bg-ff br12 flex-csa">
        <li
          class="p30 c9"
          v-for="(item,index) in menu"
          :class="{active:index==isMenu}"
          @click="menuChose(index,item.type)"
          :key="index"
        >{{item.name}}</li>
      </div>
      <!-- 日期选择 -->
      <transition name="fade">
        <div
          class="calendar-dropdown"
          :style="{'left':calendar5.left+'px','top':calendar5.top+'px'}"
          v-if="calendar5.show"
        >
          <calendar
            :zero="calendar5.zero"
            :disabled="calendar5.disabled"
            :lunar="calendar5.lunar"
            :value="calendar5.value"
            :multi="calendar5.multi"
            @select="calendar5.select"
          ></calendar>
        </div>
      </transition>
      <!-- <group class="m20 br12">
        <calendar @on-change="change" v-model="dataValue" title="日期选择" show-popup-header popup-header-title="请选择日期" disable-future></calendar>
      </group>-->
      <!-- <div class="m20 bg-ff br12 flex-csb p30" @click="showData">
          <span>日期选择</span>
          <ul>
            <span class="c9">{{dataValue}}</span>
            <img src="../assets/img/arrow_icon.png" class="arrow_icon" alt="">
          </ul>
      </div>-->
      <!-- 场地选择 -->
      <group class="m20">
        <popup-picker
          title="场地选择"
          :show-name="true"
          :data="siteAddress"
          v-model="fieldValue"
          @on-change="changeSiteAddress"
        ></popup-picker>
      </group>
      <div class="m20 bg-ff br12">
        <div class="flex-csb p30 bb-e5">
          <span>收入</span>
          <span class="c-diy">￥ {{list.income_total}}</span>
        </div>
        <div class="list flex-csb p30 bb-e5" v-for="(item,index) in list.device" :key="index">
          <div class="flex-dcf">
            <span class="c9">{{item.address}}</span>
            <span class="f30 mt20">编号：{{item.macno}}</span>
          </div>
          <div class="flex-dce">
            <span class="c9">使用次数：{{item.use_total}}次</span>
            <span class="f30 mt20">收入:￥{{item.income}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import calendar from "../components/calendar";
import {
  PopupPicker,
  DatetimePlugin,
  Datetime,
  Cell,
  Group,
  // calendar
} from "vux";
export default {
  components: {
    PopupPicker,
    Datetime,
    DatetimePlugin,
    Cell,
    Group,
    calendar
  },
  data() {
    return {
      show: false,
      isData: 0,
      isMenu: 0,
      dataValue: "",
      selectionValue: "",
      menu: [
        {
          name: "今日",
          type: 1
        },
        {
          name: "本周",
          type: 2
        },
        {
          name: "本月",
          type: 3
        }
      ],
      list: {
        income_total: "1.00",
        device: [
          {
            device_id: "1",
            macno: "2018072615252502",
            address: "迪尔西",
            ctime: "1541733010",
            use_total: 0,
            income: 0
          }
        ]
      },
      siteAddress: [],
      fieldValue: [""],
      param: {
        api_name: "income_list",
        token: localStorage.getItem("token"),
        type: 1
      }
    };
  },
  created() {
    let _this = this;
    _this.getIncomeList();
    _this.Http.post("Wxsite/Wms/api", {
      api_name: "site_list",
      token: localStorage.getItem("token")
    }).then(res => {
      // 账号在其他设备登录，强制跳出重新登录
      if (res.data.code == 101) {
        _this.$vux.toast.show({
          type: "text",
          text: "账号在其他设备登录，为避免损失请修改密码并重新登录",
          position: "center",
          time: 3000
        });
        _this.$router.push({ path: "./login" });
      }
      let data = [];
      res.data.data.forEach(item => {
        data.push({ name: item.name, value: item.site_id });
      });
      _this.siteAddress.push(data);
    });
  },
  methods: {
    getIncomeList: function() {
      const _this = this;
      _this.Http.post("Wxsite/Wms/api", _this.param).then(res => {
        if (res.data.code == 1) {
          _this.list = res.data.data;
          if (res.data.data.length <= 0) {
            that.$vux.toast.text("暂无当前数据", "center");
          }
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
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    menuChose: function(index, type) {
      this.isMenu = index;
      this.param.type = type;
      this.getIncomeList();
    },
    changeSiteAddress: function(val) {
      const _this = this;
      _this.param.site_id = val[0];
      _this.getIncomeList();
    },
    change: function(val) {
      const _this = this;
      _this.param.time = val;
      _this.getIncomeList();
    },
    showData: function() {
      console.log(this);
      // this.$vux.datetime.show({
      //   cancelText: "取消",
      //   confirmText: "确定",
      //   format: "YYYY-MM-DD",
      //   value: "2017-05-20",
      //   onConfirm(val) {
      //     this.dataValue = val;
      //     console.log("plugin confirm", val);
      //   },
      //   onShow() {
      //     console.log("plugin show");
      //   },
      //   onHide() {
      //     console.log("plugin hide");
      //   }
      // });
    },
    showSelection: function() {
      console.log(this);
    }
  }
};
</script>

<style scoped>
.active {
  color: #333;
  border-bottom: 2px solid #f49b1b;
}

.list:last-child {
  border-bottom: 0;
}
</style>
