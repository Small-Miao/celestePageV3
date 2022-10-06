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
  cookie:{maxAge:30*60*1000}             //cookie（connect.sid）的生存时间，也是session的生存时间 （半小时）  单位 毫秒 
}));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



//登录白名单 放到这个名单里的请求，都是可以不需要登录就可以访问的
let LoginWhiteList  = [
  '/captcha',//登录验证码

  '/admin/login',//后台登录
  '/admin/getLoginUser',//获取后台是否登录
  '/admin/logout',//用户登出
  

  '/player/getPlayer',//获取玩家是否登录
  '/player/register',//玩家注册
  '/player/login',//玩家登录
  '/player/logout',//玩家登出
  '/player/sendCode',//注册发送验证码
  '/player/checkUsername', // 检查用户名
];
/**
 * 登录过滤
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
let filter = async (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");　　//添加跨越访问控制
  //获取到访问地址
  let url = req._parsedUrl.pathname;
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
/**
 * 这些配置必须放到filter下，否则filter不生效
 */
app.use('/',require('./api/web/admin.js'));
app.use('/admin/user', require("./api/web/user.js"));
app.use('/admin/cdk', require("./api/web/cdk.js"));
app.use('/', require("./api/web/normal.js"));
app.use('/client', require("./api/client/map.js"));

/**
 * 前台玩家登录的接口文件
 */
app.use('/player', require("./api/web/player.js"));

app.listen(port,()=>{
    log.info("Express",undefined,undefined,`Server Listening on port ${port}`);
})
