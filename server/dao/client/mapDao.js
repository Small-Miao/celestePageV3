const sql = require('../../sql')
const util = require('../../util/util.js')


async function getMapScoreList(data){
  let sqlSource = "select * from map_user_data where mp_data_sid = ? and mp_b_side = ? and mp_c_side = ? and mp_speed_strawberry = ? and mp_golden_strawberry = ? order by mp_player_time asc limit 50"
  let args = new Array();
  args.push(data.map_sid);
  args.push(data.mp_b_side);
  args.push(data.mp_c_side);
  args.push(data.mp_speed_strawberry);
  args.push(data.mp_golden_strawberry);
  return await sql.query(sqlSource,args);
}


async function getMapList(keyword){
  let sqlSource = "select * from map_data where  ( mp_map_sid like concat('%',?,'%') or  mp_map_name like concat('%',?,'%') or  mp_main_mod like concat('%',?,'%') )";
  let args = new Array();
  args.push(keyword);
  args.push(keyword);
  args.push(keyword);
  return await sql.query(sqlSource,args);
}


async function getMaoInfo(sid){
  let sqlSource = "select * from map_data where mp_map_sid = ?";
  let args = new Array();
  args.push(sid);
  return await sql.query(sqlSource,args);
}

module.exports = {
  getMapScoreList,
  getMapList,
  getMaoInfo,
};
