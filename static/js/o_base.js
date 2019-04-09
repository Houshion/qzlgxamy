import axios from "./axios";
import wx from "weixin-js-sdk";
export default {
  /******************************* 跳转 **************************/
  goTo(to, query) {
    const _this = this;
    _this.$router.push({
      name: to,
      query: query
    })
  },
  /******************************* 微信信息 **************************/
  getWx(jsApiList, callback) {
    const _this = this;
    axios.post("Wxsite/Device/get_access_token", {}).then(res => {
      axios.post("Wxsite/Device/getTicket", {}).then(res => {
        let timestamp = (new Date().getTime() / 1000).toFixed(0);
        let noncestr = Math.random()
          .toString(36)
          .substr(2);
        // let ticket = wx_js(res.data.data.result.ticket, timestamp, noncestr);
        let e = decodeURIComponent(
            "jsapi_ticket=" +
            res.data.data.result.ticket +
            "&noncestr=" +
            noncestr +
            "&timestamp=" +
            timestamp +
            "&url=" +
            location.href.split("#")[0]
          ),
          s = new jsSHA(e, "TEXT"),
          ticket = s.getHash("SHA-1", "HEX");
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端//alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: res.data.data.appid, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: ticket, // 必填，签名，见附录1
          jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        return callback ? callback(true) : "";
      });
    });
  },
  callpay(jsApiParameters, callback) {
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener(
          "WeixinJSBridgeReady",
          jsApiCall,
          false
        );
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", jsApiCall);
        document.attachEvent("onWeixinJSBridgeReady", jsApiCall);
      }
    } else {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        jsApiParameters, // 提交的支付信息
        function (payBack) {
          WeixinJSBridge.log(payBack.err_msg);
          callback(payBack.err_msg)
        }
      );
    }
  },
  scan(type, success) {
    wx.ready(function () {
      wx.scanQRCode({
        needResult: type, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          success()
        },
        error: function (err) {
          dlctipbox.show(err);
        }
      });
    });
  },
  share(param, callback) {
    wx.ready(function () {
      wx.updateAppMessageShareData({
        title: param.title, // 分享标题
        desc: param.desc, // 分享描述
        link: param.link, // 分享链接
        imgUrl: param.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          callback()
        },
      });
      wx.updateTimelineShareData({
        title: param.title, // 分享标题
        desc: param.desc, // 分享描述
        link: param.link, // 分享链接
        imgUrl: param.imgUrl, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          callback()
        },
      });
    })
  },
  /******************************* 判断类 **************************/
  // 验证手机
  isPhone(phone) {
    if (/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone)) {
      return true;
    } else {
      return false;
    }
  },
  // 验证身份证
  getIdNum(ID) {
    var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!regIdNo.test(ID)) {
      return false;
    } else {
      return true
    }
  },
  // 验证车牌号
  getCarNum(num) {
    if (vehicleNumber.length == 7) {
      var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
      if (express.test(vehicleNumber)) {
        return false;
      } else {
        return true
      }
    } else {
      return false
    }
  },

  // 判断是否为空
  isNull(value) {
    if ($.trim(value).length) {
      return false;
    } else {
      return true;
    }
  },
  // 判断是否为数字
  isNum(num) {
    if (isNaN(num)) {
      return true;
    } else {
      return false;
    }
  },
  // 判断邮箱是否正确
  isEmail(email) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    var isok = reg.test(email);
    if (isok) {
      return true;
    } else {
      return false;
    }
  },
  isWX_Allipay() {
    if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
      return 'WX';
    } else if (window.navigator.userAgent.toLowerCase().match(/AlipayClient/i) == 'alipayclient') {
      return 'Allipay';
    } else {
      return 'Others';
    }
  },
  /****************************** 缓存类 ******************************/
  // 设置本地缓存
  setItem(key, val) {
    return window.localStorage.setItem(key, val)
  },
  // 获取本地缓存
  getItem(key) {
    return window.localStorage.getItem(key);
  },
  // 删除本地缓存
  moveItem(key) {
    localStorage.removeItem(key);
  },

  /**
   * @param name cookie名称
   * @param value cookie值
   * @param iDay cookie的时间
   */
  // 设置cookie
  setCookie(name, value, iDay) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + iDay);
    document.cookie = name + '=' + value + ';expires=' + oDate;
  },
  // 获取cookie
  getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return '';
  },
  // 删除cookie
  removeCookie(name) {
    setCookie(name, 1, -1);
  },
}
