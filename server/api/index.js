const express = require('express')
const log = require('../log')
const router = express.Router();
const sql = require('../sql')
const user = require('../dao/user.js')
const md5 = require('js-md5')
const utils = require('../util/util.js')
const redisCache = require('../util/redis.js')
/**
 * 登录
 */
router.post('/login',  async function (req, res) {
    log('INFO', 'API', '/login', 'POST', 'request!')
    let data = req.body;
    console.dir(data);
    if(!data.loginName || !data.password){
      res.json({
        message:'INVALID ARGUMENT',
        code:400
      })
      return;
    }
    /**
     * 查询用户信息
     */
    let password = md5(data.password)
    let rows = await user.queryUserByAccountAndPassword(data.loginName,data.password);
    if(rows.length > 0) {
      let uuid = utils.getUuid();
      let gmUid = rows[0].gm_uid;
      let result = await user.updateToken(uuid, gmUid);
      if (result == 1) {
        redisCache.set(uuid,rows[0],1800);
        res.json({
          code: 200,
          message: 'LOGIN SUCCESS',
          token:uuid,
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
