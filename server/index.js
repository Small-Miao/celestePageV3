const express = require('express')
const app = express()
const port = 3001
const log = require("./log")
const bodyParser = require('body-parser')
const session = require('express-session');
app.use(session({
  saveUninitialized:false,               //是否将刚创建的session存到store中
  resave:false,                          //是否定期更新已经存到store中的session
  secret:"MiaoNet",                        //用于加密connect.sid(用于寻找session的id，存在于cookie中)
  rolling:true,                          //是否在用户每次请求时重置cookie(connect.sid)的生存时间
  cookie:{maxAge:30*60*1000}             //cookie（connect.sid）的生存时间，也是session的生存时间
}));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use('/',require('./api/index.js'));
app.use('/admin', require("./api/user.js"));
app.use('/', require("./api/normal.js"));


//登录白名单 放到这个名单里的请求，都是可以不需要登录就可以访问的
let LoginWhiteList  = ['/admin/login','/captcha'];
/**
 * admin过滤
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let filter = async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");　　//添加跨越访问控制
  //获取到访问地址
  let url = req._parsedUrl.pathname;
  console.log(url)
  //查看是否在登录白名单内，如果在白名单内，则放行
  if(LoginWhiteList.indexOf(url) < 0){
    //不在登录白名单，查看用户是否登录
    let userInfo = req.session['USERINFO'];
    if (!userInfo){
      res.json({
        code: 415,
        message: "NEED LOGIN",
      })
      return;
    }else{
      next();
      return;
    }
  }
  next();
}
app.use(filter);

app.listen(port,()=>{
    log.info("Express",undefined,undefined,`Server Listening on port ${port}`);
})
