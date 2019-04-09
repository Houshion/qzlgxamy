<!--抽奖 -->
import { setTimeout } from 'timers';
<template>
  <div>
    <div class="gamesBigBox">
        <div class="gamesBox" id="luck">
          <table>
            <tr>
              <td class="unit luck-unit luck-unit-0 p-r" :class="[luck.index==0?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
              <td class="unit luck-unit luck-unit-1" :class="[luck.index==1?'active':'']">
                <img src="../assets/img/3.png">
              </td>
              <td class="unit luck-unit luck-unit-2 p-r" :class="[luck.index==2?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
              <td class="unit luck-unit luck-unit-3" :class="[luck.index==3?'active':'']">
                <img src="../assets/img/3.png">
              </td>
            </tr>
            <tr>
              <td class="unit luck-unit luck-unit-11" :class="[luck.index==11?'active':'']">
                <img src="../assets/img/3.png">
              </td>
              <td rowspan="2" colspan="2" class="cjBtn pos_r" id="btn">
                <div class="rateWin color1" style="color:#f39822;font-family:苹方,微软雅黑">
                  <p style="line-height:1.4;font-size:0.26rem">获取抽奖机会</p>
                  <p style="line-height:1.2;font-size:0.26rem">{{gameTimes}}次</p>
                </div>
              </td>
              <td class="unit luck-unit luck-unit-4 p-r" :class="[luck.index==4?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
            </tr>
            <tr>
              <td class="unit luck-unit luck-unit-10 p-r" :class="[luck.index==10?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
              <td class="unit luck-unit luck-unit-5" :class="[luck.index==5?'active':'']">
                <img src="../assets/img/3.png">
              </td>
            </tr>
            <tr>
              <td class="unit luck-unit luck-unit-9" :class="[luck.index==9?'active':'']">
                <img src="../assets/img/3.png">
              </td>
              <td class="unit luck-unit luck-unit-8 p-r" :class="[luck.index==8?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
              <td class="unit luck-unit luck-unit-7" :class="[luck.index==7?'active':'']">
                <img src="../assets/img/3.png">
              </td>
              <td class="unit luck-unit luck-unit-6 p-r" :class="[luck.index==6?'active':'']">
                <img src="../assets/img/game6.png">
                <span class="money p-a w100 f12 c0"><span class="f30">{{money}}</span>元</span>
              </td>
            </tr>
          </table>
        </div>
        <div class="games2Box pos_r">
            <div class="goBox" id="goBox" @click="go()"><img src="../assets/img/bg7.png" alt=""></div>
        </div>
    </div>
    <div class="mask flex-center jc-center" v-show="isWinTip">
      <img class="Rotation" src="../assets/img/bg1.png" alt="">
      <div class="p-a innerBox jc-center flex-dcc">
        <span class="t1 f72">恭喜获得{{money}}元</span>
        <span class="t2 f38 mt30">已放入您的钱包</span>
        <div class="pay_btn mt40" style="width:50%;" @click="goBack">返回设备</div>
      </div>
    </div>
    <div class="mask flex-center jc-center" v-show="isFailTip">
      <img class="Rotation" src="../assets/img/bg1.png" alt="">
      <div class="p-a innerBox jc-center flex-dcc">
        <span class="t1 f72">谢谢惠顾</span>
        <span class="t2 f38 mt30">还差一点，再接再厉</span>
        <div class="pay_btn mt40" style="width:50%;" @click="goBack">返回设备</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      onOff: 0, //开关
      gameTimes: 1, //抽奖机会
      isWinTip: false, //中奖弹框标识
      isFailTip: false, //不中奖弹框标识
      gailv: "", //真实概率
      probability: "", //展示概率
      money: 0, //奖品
      luck: {
        index: -1, //当前转动到哪个位置，起点位置
        count: 0, //总共有多少个位置
        timer: 0, //setTimeout的ID，用clearTimeout清除
        speed: 20, //初始转动速度
        times: 0, //转动次数
        cycle: 50, //转动基本次数：即至少需要转动多少次再进入抽奖环节
        prize: -1, //中奖位置
        count: 12 //物品位置
      },
      successStatus: [] //中奖或者不中奖数组
    };
  },
  created() {
    let that = this;
    that.getPrize();
  },
  methods: {
    //  返回设备
    goBack: function() {
      const _this = this;
      _this.$router.push({
        path:
          "./using?order_id=" +
          _this.$route.query.order_id +
          "&browser=" +
          _this.$route.query.browser +
          "&macno=" +
          _this.$route.query.macno
      });
    },
    getPrize() {
      let that = this;
      that.Http.post("Wxsite/Device/api", {
        api_name: "choujiang",
        macno: that.$route.query.macno
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.money = res.data.data.money;
          that.probability = res.data.data.probability;
        } else {
          that.onOff = 1;
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    go() {
      let that = this;
      if (that.onOff) return false;
      that.onOff = 1;
      if (that.gameTimes == 0) {
        that.$vux.toast.text("您没有抽奖机会了哦", "center");
      }
      that.gotoGame();
    },
    gotoGame() {
      let that = this;
      that.Http.post("Wxsite/Device/api", {
        api_name: "chou",
        probability: that.probability,
        money: that.money,
        order_id: that.$route.query.order_id
      }).then(res => {
        console.log(res.data.data);
        if (res.data.code == 1) {
          that.gameTimes--;
          if (res.data.data == 1) {
            console.log("中奖11");
            that.gailv = 100;
          } else {
            that.gailv = 0;
          }
          that.luck.speed = 100;
          // console.log(that.gailv / 100);
          if (that.gailv / 100 >= 1) {
            console.log("中奖22");
            that.successStatus = [];
            that.successStatus.push(0, 2, 4, 6, 8, 10);
            console.log(that.successStatus);
          } else if (that.gailv / 100 <= 0) {
            that.successStatus = [];
            that.successStatus.push(1, 3, 5, 7, 9, 11);
          }
          that.gameRoll();
        } else {
          that.onOff = 0;
          that.$vux.toast.text(res.data.msg, "center");
        }
      });
    },
    gameRoll() {
      let that = this;
      that.luck.times += 1;
      that.roll(function() {
        if (
          that.luck.times > that.luck.cycle + 10 &&
          that.luck.prize == that.luck.index
        ) {
          window.clearTimeout(that.luck.timer);
          if (
            that.luck.prize == 1 ||
            that.luck.prize == 3 ||
            that.luck.prize == 5 ||
            that.luck.prize == 7 ||
            that.luck.prize == 9 ||
            that.luck.prize == 11
          ) {
            //没中奖
            console.log("未中奖");
            that.isFailTip = true;
          } else {
            //中奖
            console.log("中奖");
            that.isWinTip = true;
          }
          //重置状态
          that.luck.prize = -1;
          that.luck.times = 0;
          that.successStatus = [];
        } else {
          if (that.luck.times < that.luck.cycle) {
            that.luck.speed -= 10;
          } else if (that.luck.times == that.luck.cycle) {
            let index = Math.random();
            index = Math.floor(index * 6);
            if (index < 6) {
              that.luck.prize = that.successStatus[index];
            } else {
              that.luck.prize = that.successStatus[3];
            }
          } else {
            if (
              that.luck.times > that.luck.cycle + 10 &&
              ((that.luck.prize == 0 && that.luck.index == 7) ||
                that.luck.prize == that.luck.index + 1)
            ) {
              that.luck.speed += 110;
            } else {
              that.luck.speed += 20;
            }
          }
          if (that.luck.speed < 40) {
            that.luck.speed = 40;
          }

          that.luck.timer = window.setTimeout(function() {
            that.gameRoll();
          }, that.luck.speed);
        }
      });
    },
    roll(callback) {
      let that = this;
      that.luck.index += 1;
      if (that.luck.index > that.luck.count - 1) {
        that.luck.index = 0;
      }
      if (typeof callback == "function") {
        callback();
      }
    }
  }
};
</script>
<style scoped>
@import "../assets/css/common.css";
@import "../assets/css/main.css";

.money {
  left: 0;
  top: 0.22rem;
  z-index: 2;
}
/* 旋转效果 */
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

.Rotation {
  -webkit-transform: rotate(360deg);
  animation: rotation 10s linear infinite;
  -moz-animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
  -o-animation: rotation 10s linear infinite;
}

.t1,
.t2 {
  color: #fff;
  /* text-shadow: #511900 3px 0 0, #511900 0 2px 0, #511900 -3px 0 0,
    #511900 0 -3px 0;

  -webkit-text-shadow: #511900 2px 0 0, #511900 0 2px 0, #511900 -2px 0 0,
    #511900 0 -2px 0;

  -moz-text-shadow: #511900 2px 0 0, #511900 0 2px 0, #511900 -2px 0 0,
    #511900 0 -2px 0;
  text-shadow: 5px 5px -8px #000; */
}

.innerBox {
  background: url(~@/./assets/img/bg2.png) no-repeat center;
  background-size: 6.8rem 5.24rem;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.startGame {
  width: 2rem;
  height: 2rem;
  z-index: 1000;
  left: 50%;
  margin-left: -1rem;
  bottom: 0;
}

.mBox {
  width: 100%;
  height: 100%;
  z-index: 100;
  background: none;
}

.tip {
  top: 3.1rem;
  left: 50%;
  margin-left: -0.9rem;
  width: 1.8rem;
  height: 0.68rem;
  font-size: 6px;
}

.container {
  background: url(~@/./assets/img/img6.png) no-repeat;
  background-size: 100% 100%;
  height: 100vh;
}

#lottery {
  width: 6.6rem;
  height: 9.14rem;
  margin: 0.96rem auto 0;
  background: url(~@/./assets/img/bg.png) no-repeat;
  background-size: 100% 100%;
  padding: 0.58rem 0.58rem;
  position: relative;
}

#lottery table td {
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 0.12rem;
  text-align: center;
  vertical-align: middle;
  font-size: 0.24rem;
  color: #333;
  font-index: -999;
}

#lottery table td > img {
  width: 1.3rem;
  height: 1.3rem;
}

#lottery table td a {
  width: 2.84rem;
  height: 2.84rem;
  line-height: 1.5rem;
  display: block;
  text-decoration: none;
}

#lottery table td.active {
  background-color: #ccc;
}
</style>
