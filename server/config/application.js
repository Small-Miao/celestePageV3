/**
 * 文件配置
 */
module.exports = {
  // Redis
  redis: {
    host: "127.0.0.1",
    port: 6379,
    options: {
      // password: "myredispassword",
      timeout: 3000
    }
  },
  // MySql
  mysql:{
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    database:'celeste'
  },
  //是否显示mysql执行的一些详细信息
  showMySqlLog:false,
  //发邮件的配置
  email:{
    //每个不同的邮箱有不同的host 我测试使用的是QQ邮箱
    host:"smtp.qq.com",
    port:465,
    auth: {
      //   发送账号
      user: "****@qq.com",
      // 授权码
      pass: "******",
    },
    //发送人
    from:'****@qq.com',
    /**
     * 自服务器启动时，发送失败阈值
     */
    limitSendErrNum:10,
    /**
     * 同一个ip地址一天最多发几次邮箱
     */
    limitIpOneDaySendNum:2,
  }
}
