const express = require('express')
const log = require('../log')
const prefix = require('../dao/prefix.js')
const responseModel = require('../util/responseModel.js')
const router = express.Router();
/**
 * 获取所有用户的头衔和颜色
 */
router.post('/prefix/getUserList', async function (req, res) {
  let queryData = req.body;
  if(!queryData.uid){
    res.json(responseModel.error());
    return;
  }
    let rows = await prefix.getPrefixs(queryData.uid);
  let result = {
    data:rows,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})
module.exports = router;
