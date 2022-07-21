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
      if(application.showMySqlLog){
        console.dir("sql==>")
        console.dir(sql)
        console.dir("args==>")
        console.dir(data)
        console.dir("result==>")
        console.dir(result)
      }
      resolve(result);
    })
  })
}
module.exports = {query}

