const express = require('express')
const app = express()
const port = 3001
const log = require("./log")
const redisCache = require('./util/redis.js')
const bodyParser = require('body-parser')
//登录白名单 放到这个名单里的请求，都是可以不需要登录就可以访问的
// let LoginWhiteList  = ['/api/login'];
let LoginWhiteList  = [];

let filter = async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");　　//添加跨越访问控制
  //获取到访问地址
  let url = req._parsedUrl.pathname;
  //查看是否在登录白名单内，如果在白名单内，则放行
  if(LoginWhiteList.indexOf(url) < 0){
    //不在登录白名单，查看header里是否有token字段
    let token = req.header('token');
    if (!token){
      res.json({
        code: 415,
        message: "NEED LOGIN",
      })
      return;
    }else if(await redisCache.expire(token,1800) > 0){
      next();
      return;
    }else{
      res.json({
        code: 415,
        message: "NEED LOGIN",
      })
      return;
    }
  }
  next();
}
app.use(filter);

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/api',require('./api/index.js'));
app.use('/api', require("./api/user.js"));

app.listen(port,()=>{
    log.info("Express",undefined,undefined,`Server Listening on port ${port}`);
})
