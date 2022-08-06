const stringRandom = require('string-random')
const moment = require('moment');

/**
 * 生成一个UUID
 * @returns {string}
 */
let getUuid = function() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  let uuid = s.join("");
  return uuid.replaceAll("-","");
}

/**
 * 生成一个16位的随机字符串==>全大写
 * @returns {string | *}
 */
let getRandomStr = function(){
  return stringRandom(16, {letters: 'ABCDEFG'});
}


/**
 * 获取当前时间 yyyy-mm-dd HH:mm:dd
 * @returns {string}
 */
function getCurrentTime() {
  var date = new Date();//当前时间
  var year = date.getFullYear() //返回指定日期的年份
  var month = repair(date.getMonth() + 1);//月
  var day = repair(date.getDate());//日
  var hour = repair(date.getHours());//时
  var minute = repair(date.getMinutes());//分
  var second = repair(date.getSeconds());//秒

  //当前时间
  var curTime = year + "-" + month + "-" + day
    + " " + hour + ":" + minute + ":" + second;
  return curTime;
}


/**
 * 补0
 * @param i
 * @returns {string|*}
 */
function repair(i){
  if (i >= 0 && i <= 9) {
    return "0" + i;
  } else {
    return i;
  }
}

/**
 * 格式化日期
 * @param date
 * @returns {string}
 */
let formatTime = function(date){
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 获取一个6位验证码
 * @returns {string}
 */
let getSixCode = function(){
  //定义字符数组
  let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
  let str = '';//定义空的字符串，作为最终的结果接收它
  for (let i = 0; i < 6; i++) {
    let num = Math.round(Math.random() * (15 - 0) + 0);//0-15的随机数
    str += arr[num];//通过产生的随机数来获取数组中的内容
  }
  return str;
}

/**
 * 获取用户访问的ip地址
 * @param req
 * @returns {*|string}
 */
let getIp = function(req) {
  var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
  if(ip.split(',').length>0){
    ip = ip.split(',')[0];
  }
  return ip;
}

/**
 * 获取今天的日期 yyyy-MM-dd
 * @returns {*}
 */
let getToday = function (){
  //今天时间
  let today = new Date();
  today.setDate(today.getDate());
  return  today.format("yyyy-MM-dd");
}

/**
 * 正则校验邮箱是否存在
 * @param email
 * @returns {boolean}
 */
let regExpEmail = function (email){
  let reg = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$");
  return email && reg.test(email);
}


/**
 * 暴漏出这个方法
 * @type {function(): string}
 */
module.exports = {
  getUuid,
  getRandomStr,
  getCurrentTime,
  formatTime,
  getSixCode,
  getIp,
  getToday,
  regExpEmail,
}


