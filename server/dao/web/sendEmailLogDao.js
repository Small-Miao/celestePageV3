const sql = require('../../sql')
const util = require('../../util/util.js')


/**
 * 根据ip地址来获取今天发送的次数
 * @param ip
 * @returns {Promise<void>}
 */
async function getTodaySendEmailNum(ip){
  let today = util.getToday();
  let sqlSource = "select count(id) zs from send_email_log where ip = ? and day= ? "
  let result = await sql.query(sqlSource,[ip,today]);
  return result[0].zs;
}

/**
 * 保存发送邮件成功日志
 * @param ip
 * @param code
 * @returns {Promise<unknown>}
 */
async function saveSendEamilLog(ip,code){
  let sqlSource = "insert into send_email_log (ip,day,code)values(?,?,?)"
  let today = util.getToday();
  let result = await sql.query(sqlSource,[ip,today,code]);
  return result;
}

module.exports = {
  getTodaySendEmailNum,
  saveSendEamilLog,
};
