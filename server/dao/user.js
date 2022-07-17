const sql = require('../sql')

/**
 * 用户登录
 * @param userAccount
 * @param password
 * @returns {{code: number, message: string}}
 */
async function queryUserByAccountAndPassword(userAccount,password){
  return await sql.query('select * from user where gm_username = ? and gm_password = ?', [userAccount, password]);
}



/**
 * 更新用户的token
 * @param token
 * @param uid
 */
async function updateToken(token,uid){
  let result =  await sql.query("update user set gm_token = ? where gm_uid = ?",[token,uid]);
  return result.changedRows;
}

module.exports = {queryUserByAccountAndPassword,updateToken};
