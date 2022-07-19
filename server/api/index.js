const express = require('express')
const log = require('../log')
const router = express.Router();
const user = require('../dao/user.js')
const md5 = require('js-md5')
const utils = require('../util/util.js')
const redisCache = require('../util/redis.js')
const responseModel = require('../util/responseModel.js')
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
    let captcha = req.cookies.captcha;
    res.cookie('captcha', null);
    if (data.code.toLowerCase() !== captcha) {
      res.send({
        message:'WRONG CAPTCHA',
        code:401
      })
      return
    }
    /**
     * 查询用户信息
     */
    let password = md5(data.password)
    let rows = await user.queryUserByAccountAndPassword(data.username,password);
    if(rows.length > 0) {
      let token = utils.getUuid();
      let gmUid = rows[0].gm_uid;
      let result = await user.updateToken(token, gmUid);
      if (result == 1) {
        redisCache.set(token,rows[0],1800);
        res.cookie('token', token.toLowerCase())
        res.json({
          code: 200,
          message: 'LOGIN SUCCESS',
          'token':token,
          'username':rows[0].gm_username,
        })
      }else{
        res.json({
          code:201,
          message:'LOGIN FAILED'
        })
      }
    }else {
      res.json({
        code:201,
        message:'LOGIN FAILED'
      })
      return;
    }
})

/**
 * admin 退出
 */
router.post('/admin/logout',  async function (req, res) {
  log.info( 'API', '/admin/logout', 'POST', 'request!')
  let token = req.header("token");
  let result = redisCache.delKey(token);
  res.cookie('token', null)
  res.json({
    code: 200,
    message: 'LOGOUT SUCCESS',
  })
});


/**
 * 获取用户信息
 */
router.post('/getLoginUser',  async function (req, res) {
  log('INFO', 'API', '/getLoginUser', 'POST', 'request!')
  let token = req.header('token');
  console.log(token);
  let userInfo = await redisCache.get(token);
  if(userInfo){
    //TODO  这里不应该把密码传递出去的
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
