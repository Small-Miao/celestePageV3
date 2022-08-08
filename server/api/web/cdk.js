const express = require('express')
const log = require('../../log')
const cdkDao = require('../../dao/web/cdkDao.js')
const responseModel = require("../../util/responseModel");
const util = require('../../util/util.js')
const router = express.Router();

/**
 * 获取所有的CDK
 */
router.post('/list', async function (req, res) {
  let queryData = req.body;
  console.log(queryData)
  let page = 1;
  let pagesize = 20;
  if(queryData.page){
    page = queryData.page;
  }
  if(queryData.pagesize){
    pagesize = queryData.pagesize;
  }
  let count = await cdkDao.count(queryData.search);
  let rows = [];
  if(count > 0){
    rows = await cdkDao.listByPage(queryData.search,page,pagesize);
    for(let i = 0 ; i< rows.length ; i++){
      rows[i].starttime = util.formatTime(rows[i].starttime);
      rows[i].endtime = util.formatTime(rows[i].endtime);
    }
  }
  let result = {
    "count":count,
    data:rows,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})

/**
 * 生成CDK
 */
router.post('/generate', async function (req, res) {
  let data = req.body;
  if(!data.resource || data.resourceType == null || data.resourceType == undefined
    || !data.starttime || !data.endtime || !data.generate_num){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let num = 0;
  try{
    num = parseInt(data.generate_num);
  }catch (e){
    res.json({
      message:'INVALID ARGUMENT',
      code:400
    })
    return;
  }
  let result = 0;
  for(let i = 0;i < num; i++){
    result+= await  cdkDao.insert(data.resource,data.resourceType,data.starttime,data.endtime);
  }
  res.json({
    code:200,
    message:'SUCCESS',
    num:result,
  })
  return;
})


module.exports = router;
