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
  }
}
