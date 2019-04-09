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
      <div class="flex-csb p30 bb-e5 m20 bg-ff">
        <span>日期</span>
        <ul class="flex-cfs flex1">
          <input
            class="flex1 ta-right c9"
            type="text"
            @click="openByDialog"
            :value="calendar4.display"
            readonly
          >
          <img src="../assets/img/arrow_icon.png" class="arrow_icon ml20" alt>
        </ul>
      </div>

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
      <transition name="fade">
        <div class="calendar-dialog" v-if="calendar4.show">
          <div class="calendar-dialog-mask" @click="closeByDialog"></div>

          <div class="calendar-dialog-body">
            <calendar
              :range="calendar4.range"
              :zero="calendar4.zero"
              :lunar="calendar4.lunar"
              :value="calendar4.value"
              @select="calendar4.select"
            ></calendar>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import {
  PopupPicker,
  DatetimePlugin,
  Datetime,
  Cell,
  Group,
  Calendar
} from "vux";
import calendar from "../components/calendar.vue";
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
      calendar4: {
        display: "",
        show: false,
        range: true,
        zero: true,
        value: [], //默认日期
        lunar: true, //显示农历
        select: (begin, end) => {
          console.log(begin, end);
          this.calendar4.show = false;
          this.calendar4.value = [begin, end];
          this.calendar4.display = begin.join("/") + "," + end.join("/");
          const _this = this;
          _this.param.time = _this.calendar4.display;
          _this.getIncomeList();
        }
      },
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
      _this.calendar4.show = false;
      _this.param.site_id = val[0];
      _this.getIncomeList();
    },
    showSelection: function() {
      console.log(this);
    },
    openByDrop(e) {
      this.calendar3.show = true;
      this.calendar3.left = e.target.offsetLeft + 19;
      this.calendar3.top = e.target.offsetTop + 70;
      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener(
          "click",
          e => {
            this.calendar3.show = false;
            document.removeEventListener("click", () => {}, false);
          },
          false
        );
      }, 1000);
    },
    openByDialog() {
      this.calendar4.show = true;
    },
    closeByDialog() {
      this.calendar4.show = false;
    },
    openMultiByDrop(e) {
      this.calendar5.show = true;
      this.calendar5.left = e.target.offsetLeft + 19;
      this.calendar5.top = e.target.offsetTop + 70;
      e.stopPropagation();
      window.setTimeout(() => {
        document.addEventListener(
          "click",
          e => {
            this.calendar5.show = false;
            document.removeEventListener("click", () => {}, false);
          },
          false
        );
      }, 1000);
    },
    changeEvents() {
      this.calendar1.events = {
        "2017-7-20": "$" + ((Math.random() * 1000) >> 0),
        "2017-7-21": "$" + ((Math.random() * 1000) >> 0),
        "2017-7-22": "$" + ((Math.random() * 1000) >> 0)
      };
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
/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}
/*下拉框*/
.calendar-dropdown {
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
.calendar-dropdown:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #dedede;
}
.calendar-dropdown:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}
/*弹出框*/
.calendar-dialog {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.calendar-dialog-mask {
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  z-index: 100;
}
.calendar-dialog-body {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
</style>
