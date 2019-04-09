import Vue from "vue";
import Router from "vue-router";
import Center from "@/pages/Center";
import Wallet from "@/pages/Wallet";
import AmOrder from "@/pages/AmOrder";
import AmOrderDetail from "@/pages/AmOrderDetail";
import shopOrder from "@/pages/shopOrder";
import Address from "@/pages/Address";
import About from "@/pages/About";
import Info from "@/pages/Info";
import Coupon from "@/pages/Coupon";
import Recharge from "@/pages/Recharge";
import Chose from "@/pages/Chose";
import ConfirmOrder from "@/pages/ConfirmOrder";
import Using from "@/pages/Using";
import Repair from "@/pages/Repair";
import Agent from "@/pages/Agent";
import Shop from "@/pages/Shop";
import ShopDetail from "@/pages/ShopDetail";
import shopConfirm from "@/pages/shopConfirm";
import luckyDraw from "@/pages/luckyDraw";
import Game from "@/pages/Game";
import Edit from "@/pages/Edit";
import Login from "@/pages/Login";
import operateCenter from "@/pages/operateCenter";
import incomeCount from "@/pages/incomeCount";
import incomeCount1 from "@/pages/incomeCount1";
import Macno from "@/pages/Macno";
import MacnoDetail from "@/pages/MacnoDetail";
import myOrder from "@/pages/myOrder";
import myOrderDetail from "@/pages/myOrderDetail";
import accountManage from "@/pages/accountManage";
import orderManage from "@/pages/orderManage";
import device from "@/pages/device";
import deviceDetail from "@/pages/deviceDetail";
import deposit from "@/pages/Deposit";
import shopOrderDetail from "@/pages/shopOrderDetail";
import scan from "@/pages/scan";

Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      name: "operateCenter",
      component: operateCenter,
      meta: {
        title: "运营中心"
      }
    },
    {
      path: "/shopOrderDetail",
      name: "shopOrderDetail",
      component: shopOrderDetail,
      meta: {
        title: "订单详情"
      }
    },
    {
      path: "/AmOrderDetail",
      name: "AmOrderDetail",
      component: AmOrderDetail,
      meta: {
        title: "按摩详情"
      }
    },
    {
      path: "/Center",
      name: "Center",
      component: Center,
      meta: {
        title: "个人中心"
      }
    },
    {
      path: "/deviceDetail",
      name: "deviceDetail",
      component: deviceDetail,
      meta: {
        title: "设备详情"
      }
    },
    {
      path: "/deposit",
      name: "deposit",
      component: deposit,
      meta: {
        title: "申请提现"
      }
    },
    {
      path: "/Macno",
      name: "Macno",
      component: Macno,
      meta: {
        title: "我的设备"
      }
    },
    {
      path: "/myOrder",
      name: "myOrder",
      component: myOrder,
      meta: {
        title: "我的订单"
      }
    },
    {
      path: "/myOrderDetail",
      name: "myOrderDetail",
      component: myOrderDetail,
      meta: {
        title: "订单详情"
      }
    },
    {
      path: "/MacnoDetail",
      name: "MacnoDetail",
      component: MacnoDetail,
      meta: {
        title: "设备详情"
      }
    },
    {
      path: "/incomeCount",
      name: "incomeCount",
      component: incomeCount,
      meta: {
        title: "收入统计"
      }
    },
    {
      path: "/incomeCount1",
      name: "incomeCount1",
      component: incomeCount1,
      meta: {
        title: "收入统计1"
      }
    },
    {
      path: "/device",
      name: "device",
      component: device,
      meta: {
        title: "设备管理"
      }
    },
    {
      path: "/orderManage",
      name: "orderManage",
      component: orderManage,
      meta: {
        title: "订单管理"
      }
    },
    {
      path: "/accountManage",
      name: "accountManage",
      component: accountManage,
      meta: {
        title: "账号管理"
      }
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: {
        title: "登录"
      }
    },
    {
      path: "/operateCenter",
      name: "operateCenter",
      component: operateCenter,
      meta: {
        title: "运营中心"
      }
    },
    {
      path: "/Edit",
      name: "Edit",
      component: Edit,
      meta: {
        title: "新增地址"
      }
    },
    {
      path: "/Wallet",
      name: "Wallet",
      component: Wallet,
      meta: {
        title: "钱包"
      }
    },
    {
      path: "/Game",
      name: "Game",
      component: Game,
      meta: {
        title: "抽奖"
      }
    },
    {
      path: "/shopConfirm",
      name: "shopConfirm",
      component: shopConfirm,
      meta: {
        title: "确认订单"
      }
    },
    {
      path: "/luckyDraw",
      name: "luckyDraw",
      component: luckyDraw,
      meta: {
        title: "抽奖"
      }
    },
    {
      path: "/Shop",
      name: "Shop",
      component: Shop,
      meta: {
        title: "商城"
      }
    },
    {
      path: "/ShopDetail",
      name: "ShopDetail",
      component: ShopDetail,
      meta: {
        title: "商品详情"
      }
    },
    {
      path: "/Agent",
      name: "Agent",
      component: Agent,
      meta: {
        title: "代理"
      }
    },
    {
      path: "/AmOrder",
      name: "AmOrder",
      component: AmOrder,
      meta: {
        title: "按摩订单"
      }
    },
    {
      path: "/shopOrder",
      name: "shopOrder",
      component: shopOrder,
      meta: {
        title: "商城订单"
      }
    },
    {
      path: "/Address",
      name: "Address",
      component: Address,
      meta: {
        title: "地址管理"
      }
    },
    {
      path: "/About",
      name: "About",
      component: About,
      meta: {
        title: "关于我们"
      }
    },
    {
      path: "/Info",
      name: "Info",
      component: Info,
      meta: {
        title: "个人信息"
      }
    },
    {
      path: "/Coupon",
      name: "Coupon",
      component: Coupon,
      meta: {
        title: "优惠券"
      }
    },
    {
      path: "/Recharge",
      name: "Recharge",
      component: Recharge,
      meta: {
        title: "充值"
      }
    },
    {
      path: "/Chose",
      name: "Chose",
      component: Chose,
      meta: {
        title: "选择套餐",
        allowBack: true
      }
    },
    {
      path: "/ConfirmOrder",
      name: "ConfirmOrder",
      component: ConfirmOrder,
      meta: {
        title: "确认订单",
        allowBack: true
      }
    },
    {
      path: "/Using",
      name: "Using",
      component: Using,
      meta: {
        title: "使用中",
        allowBack: false
      }
    },
    {
      path: "/Repair",
      name: "Repair",
      component: Repair,
      meta: {
        title: "我要报障"
      }
    },
    {
      path: "/scan",
      name: "scan",
      component: scan,
      meta: {
        title: "扫码使用"
      }
    },
  ]
});
