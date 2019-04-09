let toFixed = (input, num) => Number(input).toFixed(num)
export {
  toFixed
} //默认导出

/**
 * 转换时间
 * @author Ocean
 * @param {int} time 传入时间戳
 * @param {string} ff 转换日期格式 Y-m-d 等，下方有著明
 */
export const timeStr = (time, ff) => {
  if (Number(time).toString().length == 10) {
    time = Number(time + "000")
  }
  time = new Date(time);
  var year = time.getFullYear();
  var month =
    time.getMonth() + 1 < 10 ?
    "0" + (time.getMonth() + 1) :
    time.getMonth() + 1;
  var date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  var hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  var minute =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  var second =
    time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  if (ff == "Y-m-d") {
    return year + "-" + month + "-" + date;
  } else if (ff == "Y-m-d H:i:s") {
    return (
      year +
      "-" +
      month +
      "-" +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  } else if (ff == "Y-m-d H:i") {
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  } else if (ff == "Y.m.d") {
    return year + "." + month + "." + date;
  } else if (ff == "Y.m.d H:i:s") {
    return (
      year +
      "." +
      month +
      "." +
      date +
      " " +
      hour +
      ":" +
      minute +
      ":" +
      second
    );
  } else if (ff == "Y.m.d H:i") {
    return year + "." + month + "." + date + " " + hour + ":" + minute;
  }
}

/**
 * 计时器
 * @author Ocean
 * @param {int} value 传入时间，单位 秒
 */
export const countTime = (value) => {
  let theTime = parseInt(value)
  let theTime1 = 0
  let theTime2 = 0
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60)
      theTime1 = parseInt(theTime1 % 60)
    }
  }
  let result = '' + parseInt(theTime) < 10 ? "0" + parseInt(theTime) : parseInt(theTime) // 秒
  if (theTime1 > 0) {
    result = '' + (parseInt(theTime1) < 10 ? "0" + parseInt(theTime1) : parseInt(theTime1)) + ':' + result // 分
  } else {
    result = '00:' + result
  }
  if (theTime2 > 0) {
    result = '' + (parseInt(theTime2) < 10 ? "0" + parseInt(theTime2) : parseInt(theTime2)) + ':' + result // 时
  } else {
    // result = '00:' + result
  }
  return result
}
