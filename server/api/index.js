const express = require('express')
const log = require('../log')
const router = express.Router();
const user = require('../dao/user.js')
const md5 = require('js-md5')
const utils = require('../util/util.js')
/**
 * admin登录
 */
router.post('/admin/login',  async function (req, res) {
    log.info( 'API', '/admin/login', 'POST', 'request!')
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
        'username':rows[0].gm_username,
        'uid':rows[0].gm_uid,
        'gm_prefix':rows[0].gm_prefix,
        'bot_gold':rows[0].bot_gold,
        'gm_color':rows[0].gm_color
      }
      req.session.USERINFO = USERINFO;
      // let token = utils.getUuid();
      // let gmUid = rows[0].gm_uid;
      // let result = await user.updateToken(token, gmUid);
      res.json({
        code: 200,
        message: 'LOGIN SUCCESS',
        'username':rows[0].gm_username,
        'uid':rows[0].gm_uid,
        'gm_prefix':rows[0].gm_prefix,
        'bot_gold':rows[0].bot_gold,
        'gm_color':rows[0].gm_color
      })
    }else{
      res.json({
        code:201,
        message:'LOGIN FAILED'
      })
    }
})

/**
 * admin 退出
 */
router.post('/admin/logout',  async function (req, res) {
  log.info( 'API', '/admin/logout', 'POST', 'request!')
  req.session.destroy(function(err){
    res.json({
      code: 200,
      message: 'LOGOUT SUCCESS',
    })
  });

});


/**
 * 获取用户信息
 */
router.post('/admin/getLoginUser',  async function (req, res) {
  log('INFO', 'API', '/getLoginUser', 'POST', 'request!')
  let userInfo = req.session.USERINFO;
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

module.exports = router;
