const sql = require('../sql')

/**
 * 查询出用户的所有头衔
 * @param gmUid
 * @returns {{code: number, message: string}}
 */
async function getPrefixs(gmUid){
  return await sql.query('select u_prefix,u_color from user where gmUid = ? ', [gmUid]);
}

module.exports = {getPrefixs};
