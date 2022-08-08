const sql = require('../../sql')
const util = require('../../util/util.js')


/**
 * 根据条件查询条数
 * @param query
 * @returns {{code: number, message: string}}
 */
async function count(query){
  let sqlSource = "select count(cdkid) zs from cdks where 1=1  ";
  let args = new Array()
  if(query.keyword){
    args.push(query.keyword)
    args.push(query.keyword)
    sqlSource += " and ( cdk like concat('%',?,'%') or  resource like concat('%',?,'%') )"
  }
  if(query.resourceType && query.resourceType <=1){
    args.push(query.resourceType)
    sqlSource += " and resource_type = ? "
  }
  if(query.used  && query.used <=1){
    args.push(query.used)
    sqlSource += " and used = ? "
  }
  let result = await sql.query(sqlSource,args);
  return result[0].zs;
}


async function listByPage(query,page,pagesize){
  let sqlSource = "select * from cdks where 1=1  ";
  let args = new Array()
  if(query.keyword){
    args.push(query.keyword)
    args.push(query.keyword)
    sqlSource += " and ( cdk like concat('%',?,'%') or  resource like concat('%',?,'%') )"
  }
  if(query.resourceType  && query.resourceType <=1){
    args.push(query.resourceType)
    sqlSource += " and resource_type = ? "
  }
  if(query.used  && query.used <=1){
    args.push(query.used)
    sqlSource += " and used = ? "
  }
  let first = (page - 1) * pagesize;
  args.push(first);
  args.push(pagesize);
  sqlSource += " order by cdkid desc limit ?,?"
  return await sql.query(sqlSource,args);
}


async function insert(resource,resource_type,starttime,endtime){
  let cdk = util.getRandomStr();
  let sqlSource = "INSERT INTO cdks ( cdk, resource, resource_type, starttime, endtime, used, create_time)VALUES(?,?,?,?,?,?,?)"
  let args = new Array()
  args.push(cdk);
  args.push(resource);
  args.push(resource_type);
  args.push(starttime);
  args.push(endtime);
  args.push(0);
  args.push(util.getCurrentTime());
  let result = await sql.query(sqlSource,args);
  return result;
}

module.exports = {
  count,
  listByPage,
  insert
};
