const sql = require('../../sql')
const util = require('../../util/util.js')

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

async function count(keyword){
  let sqlSource = "select count(1) zs from user ";
  let args = new Array()
  if(keyword){
    sqlSource += " where gm_username like  CONCAT('%',?,'%')"
    args.push(keyword);
  }
  let result = await sql.query(sqlSource,args);
  return result[0].zs;
}

async function listByPage(keyword,page,pagesize){
  let sqlSource = "select gm_uid,gm_username,gm_token,gm_prefix,gm_isban,bot_gold,bot_last_sign,gm_color from user ";
  let args = new Array()
  if(keyword){
    sqlSource += " where gm_username like  CONCAT('%',?,'%')"
    args.push(keyword);
  }
  let first = (page - 1) * pagesize;
  args.push(first);
  args.push(pagesize);
  sqlSource += " order by gm_uid limit ?,?"
  return await sql.query(sqlSource,args);
}

async function checkUserName(username,gmUid){
  let sqlSource = "select count(gm_uid) zs from user where gm_username = ? ";
  let args = new Array()
  args.push(username)
  if(gmUid){
    sqlSource += " and gm_uid <> ?"
    args.push(gmUid)
  }
  let result = await sql.query(sqlSource,args);
  return result[0].zs;
}

async function edit(data){
  if(data.gm_uid && data.gm_uid > 0){
    //如果uid存在，那就是修改，只允许修改 gm_isban,gm_prefix,bot_gold,gm_color
    let sqlSource = "update user set gm_isban=?,gm_prefix=?,bot_gold=?,gm_color=? where gm_uid=? "
    let args = new Array()
    args.push(data.gm_isban);
    args.push(data.gm_prefix);
    args.push(data.bot_gold);
    args.push(data.gm_color);
    args.push(data.gm_uid);
    let result = await sql.query(sqlSource,args);
    console.dir(result);
    return result;
  }else{
    let sqlSource = " insert into user (gm_username,gm_password,gm_prefix,gm_isban,bot_gold,gm_color) values(?,?,?,?,?,?) "
    let args = new Array()
    args.push(data.gm_username);
    args.push(data.gm_password);
    args.push(data.gm_prefix);
    args.push(data.gm_isban);
    args.push(data.bot_gold);
    args.push(data.gm_color);
    let result = await sql.query(sqlSource,args);
    return result;
  }
}


async function getUserByUid(gmUid){
  let result = await sql.query("select gm_uid,gm_username,gm_prefix,gm_isban,bot_gold,gm_color from user where gm_uid=?",[gmUid]);
  return result;
}


async function deleteUser(gm_uids){
  let resultNum = 0;
  for(let i = 0;i < gm_uids.length ;i++){
    let result = await sql.query("delete from user where gm_uid =?",[gm_uids[i]]);
    resultNum += result.affectedRows;
  }
  return resultNum;
}


async function resetPassword(gm_uid,password){
  let result = await sql.query("update user set gm_password= ? where gm_uid =? ",[password,gm_uid])
  return result.affectedRows;
}


async function checkInviteCode(incite_code){
  let sqlSource = "select count(gm_uid) zs from user where invite_code = ? ";
  let args = new Array()
  args.push(incite_code)
  let result = await sql.query(sqlSource,args);
  return result[0].zs;
}

async function register(username,password,email){
  let sqlSource = " insert into user (gm_username,gm_password,gm_isban,bot_gold,gm_email) values(?,?,?,?,?) "
  let args = new Array()
  args.push(username);
  args.push(password);
  args.push(0);
  args.push(0);
  args.push(email);
  let result = await sql.query(sqlSource,args);
  return result;
}


async function getPlayerByInviteCode(invite_code){
  let sqlSource = "select * from user where invited_code = ? ";
  let args = new Array()
  args.push(invite_code)
  return await sql.query(sqlSource,args);
}

async function checkGmemail(emailurl){
  let sqlSource = "select count(gm_uid) zs from user where gm_email = ? ";
  let args = new Array()
  args.push(emailurl)
  let result = await sql.query(sqlSource,args);
  return result[0].zs;
}

async function getUserByEmail(email){
  let sqlSource = "select * from user where gm_email=?"
  let args = new Array()
  args.push(email)
  return await sql.query(sqlSource,args);
}



module.exports = {
  queryUserByAccountAndPassword,
  updateToken,
  count,
  listByPage,
  checkInviteCode,
  checkUserName,
  edit,
  getUserByUid,
  deleteUser,
  resetPassword,
  register,
  getPlayerByInviteCode,
  checkGmemail,
  getUserByEmail,
};
