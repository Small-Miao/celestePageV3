const sql = require('mysql')
const application = require("../config/application.js");
function getSqlConnection(){
  const pool = sql.createPool(application.mysql)
  return pool;
}
query = async function(sql,data) {
  let connection = getSqlConnection();
  return new Promise((resolve,reject)=>{
    connection.query(sql,data, function (err, result) {
      resolve(result);
    })
  })
}
module.exports = {query}

