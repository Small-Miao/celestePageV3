let nodemailer = require("nodemailer");
const application = require("../config/application.js");

let config = application.email;
/**
 * 这里设置发送失败次数，达到一定限制的时候，就直接不再发送邮件了，保护一下发送账号
 * @type {number}
 */
let errNum = 0;
let transport = nodemailer.createTransport({
  host: config.host,
  //  使用ssl
  secureConnection: true,
  //   端口号不改动
  port: config.port,
  //   填写个人信息
  auth:config.auth,
});


/**
 * 发送邮箱验证码
 *
 * 返回值有3个，-1 0 1
 * -1 代表发送邮件失败次数过多，暂停服务了
 * 0 代表发送失败
 * 1 发送成功
 * @param emailurl
 * @param code
 * @returns {Promise<*>}
 */
async function sendCode(emailurl,code){
  if(config.limitSendErrNum <= errNum){
    return -1;
  }
  let mailOptions = {
    from: config.from,
    //   收件人的邮箱 可加 ","添加多个收件人
    to: emailurl,
    //   标题
    subject: "蔚蓝注册验证码",
    //   内容
    text: "你好",
    html: "<div>【蔚蓝群服MiaoNet】您正在注册蔚蓝群服MiaoNet，验证码：<b>"+code+"</b>,5分钟内有效</div>",
  };
  try{
    let res = await transport.sendMail(mailOptions);
    return 1;
  }catch (e){
    return 0;
  }
}



async function sendForgotPasswordCode(emailurl,code){
  if(config.limitSendErrNum <= errNum){
    return -1;
  }
  let mailOptions = {
    from: config.from,
    //   收件人的邮箱 可加 ","添加多个收件人
    to: emailurl,
    //   标题
    subject: "蔚蓝忘记密码验证",
    //   内容
    text: "你好",
    html: "<div>【蔚蓝群服MiaoNet】您正在尝试重置蔚蓝群服MiaoNet的密码，验证码：<b>"+code+"</b>,5分钟内有效</div>",
  };
  try{
    let res = await transport.sendMail(mailOptions);
    return 1;
  }catch (e){
    return 0;
  }
}


module.exports = {
  sendCode,
  sendForgotPasswordCode,
}
