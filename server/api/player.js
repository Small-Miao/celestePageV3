const express = require('express')
const log = require('../log')
const user = require('../dao/user.js')
const responseModel = require('../util/responseModel.js')
const util = require('../util/util.js')
const email = require('../util/email.js')
const sendEmailLogDao = require('../dao/sendEmailLogDao.js')
const application = require('../config/application.js')
const md5 = require("js-md5");
const router = express.Router();

/**
 *  玩家登录接口
 */
router.post('/login', async function (req, res) {
  let queryData = req.body;
  let data = req.body;
  if(!data.username || !data.password || !data.code){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let captcha = req.session.captcha;
  req.session.captcha = null;
  if (!captcha || data.code.toLowerCase() !== captcha) {
    res.send({
      message:'WRONG CAPTCHA',
      code:401
    })
    return
  }
  let password = md5(data.password)
  let rows = await user.queryUserByAccountAndPassword(data.username,password);
  if(rows.length > 0 && rows.length == 1) {

    let USERINFO = {
      'uid':rows[0].gm_uid,
      'userName':rows[0].gm_username,
      'userDescription':rows[0].gm_description,
      'userPrefix':rows[0].gm_prefix,
      'color':rows[0].gm_color,
      'email':rows[0].gm_email
    }
    req.session.PLAYER_USERINFO = USERINFO;
    res.json({
      code: 200,
      message: 'LOGIN SUCCESS',
      'uid':rows[0].gm_uid,
      'userName':rows[0].gm_username,
      'userDescription':rows[0].gm_description,
      'userPrefix':rows[0].gm_prefix,
      'color':rows[0].gm_color,
      'email':rows[0].gm_email
    })
  }else{
    res.json({
      code:201,
      message:'LOGIN FAILED'
    })
  }
})


/**
 * 同一个Session中确认是否有玩家登录了
 */
router.post('/getPlayer',  async function (req, res) {
  log.info( 'API', '/getPlayer', 'POST', 'request!')
  let userInfo = req.session.PLAYER_USERINFO;
  if(userInfo){
    res.json({
      code: 200,
      message: 'SUCCESS',
      'userInfo':userInfo,
    })
    return;
  }else{
    res.json({
      code:201,
      message:'NOT LOGIN'
    })
    return;
  }
})

/**
 * 玩家注册前，填写的用户名是否存在
 */
router.post('/checkUsername',  async function (req, res) {
  log.info( 'API', '/checkUsername', 'POST', 'request!')
  let queryData = req.body;
  let gm_username  = queryData.gm_username;
  if(!gm_username){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let count = await user.checkUserName(gm_username,null);
  let result = {
    "exist":count > 0,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})

/**
 * 校验邀请码是否有效
 *
 * 使用邮箱验证，则该方法被废弃
 * old：
 * 有效指的：<限制每个玩家可以邀请两位新玩家，游戏时长超过50个小时可以多邀请一位新玩家 -- from Small_Miao Edit by AnAloneJaver>
 *   如果这样的话，得到一个可以注册一个新账号的邀请码，则可以得到一个新账号，然后得到可以邀请两个新玩家的邀请码，然后以2的指数增长  很明显是不合适的
 *   new：
 *  有效指的：<限制每个玩家可以邀请零位新玩家，游戏时长每超过50个小时可以邀请一位新玩家 -- from Small_Miao Edit by AnAloneJaver>
 */
router.post('/checkInviteCode',  async function (req, res) {
  log.info( 'API', '/checkInviteCode', 'POST', 'request!')
  let queryData = req.body;
  let invite_code  = queryData.invite_code;
  if(!invite_code){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let result = {
    "canInvite":false,
  }
  let rows = await user.getPlayerByInviteCode(invite_code);
  if(rows && rows.length == 1){
    let onlineTime = rows[0].gm_onlinetime;
    let canInvitePlayerNum =  parseInt(onlineTime/3000);
    result = {
      "canInvite":(result < canInvitePlayerNum),
    }
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})


/**
 * 邮箱发送验证码
 */
router.post('/sendCode',  async function (req, res) {
  log.info( 'API', '/sendCode', 'POST', 'request!')
  let queryData = req.body
  let emailurl  = queryData.email;
  //校验邮箱是否已经注册
  let userNum = await user.checkGmemail(emailurl)
  if(userNum > 0){
    res.json({
      message:'EMAIL EXISTES ALREARY',
      code:401
    })
    return;
  }
  let ip = util.getIp(req);
  let num = await sendEmailLogDao.getTodaySendEmailNum(ip);
  if(num >= application.email.limitIpOneDaySendNum){
    res.json({
      message:'SENDCODE FAIL,TRY AGAIN TOMORROW',
      code:402
    })
    return;
  }
  if(!util.regExpEmail(emailurl)){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let code = util.getSixCode();
  let response = await email.sendCode(emailurl,code);
  if(response == -1){
    res.json({
      message:'STOP SENDEMAIL SERVICE',
      code:403
    })
    return;
  }else if(response == 1){
    await sendEmailLogDao.saveSendEamilLog(ip,code);
    req.session.EMAIL_CODE = emailurl + "_" +code;
    res.json({
      message:'SENDCODE SUCCESS',
      code:200
    })
    return;
  }else{
    res.json({
      message:'SENDCODE FAIL',
      code:406
    })
    return;
  }

})

/**
 * 玩家注册
 */
router.post('/register',   async function (req, res) {
  log.info( 'API', '/register', 'POST', 'request!')
  let data = req.body;
  if(!data.username || util.regExpEmail(data.email)|| !data.password || !data.comfirm_password || (data.password != data.comfirm_password ) || !data.email_code){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  //校验邮箱是否已经存在
  let userNum = await user.checkGmemail(data.email)
  if(userNum > 0){
    res.json({
      message:'EMAIL WAS EXISTES ALREARY',
      code:401
    })
    return;
  }
  let session_emil_code = req.session.EMAIL_CODE;
  if(!session_emil_code || 'null' == session_emil_code || data.email + "_"+data.email_code != session_emil_code){
    res.json({
      message:'WRONG EMAILCODE',
      code:402
    })
    return;
  }
  //校验用户名是否有效
  let count1 = await user.checkUserName(data.username,null);
  if(count1 == 0){
    let password = md5(data.password)
    let result = await user.register(data.username,password,data.email);
    //校验成功直接给session中的验证码给清空掉
    req.session.EMAIL_CODE = '';
    res.json({
      code:200,
      message:'SUCCESS'
    })
  }else {
    res.json({
      code:403,
      message:'USERNAME WAS EXISTED ALEARLY'
    });
    return;
  }
})

module.exports = router;
