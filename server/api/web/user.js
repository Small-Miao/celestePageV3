const express = require('express')
const log = require('../../log')
const user = require('../../dao/web/user.js')
const md5 = require('js-md5')
const responseModel = require('../../util/responseModel.js')
const router = express.Router();
/**
 * 获取用户列表
 */
router.post('/list', async function (req, res) {
  let queryData = req.body;
  let page = 1;
  let pagesize = 20;
  if(queryData.page){
    page = queryData.page;
  }
  if(queryData.pagesize){
    pagesize = queryData.pagesize;
  }
  let count = await user.count(queryData.search.keyword);
  let rows = [];
  if(count > 0){
    rows = await user.listByPage(queryData.search.keyword,page,pagesize);
  }
  let result = {
    "count":count,
    data:rows,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})

/**
 * 检查用户名的个数
 */
router.post('/checkUserName', async function (req, res) {
  let queryData = req.body;
  let gm_username  = queryData.gm_username;
  let count = await user.checkUserName(gm_username,null);
  let result = {
    "count":count,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})

/**
 * 添加账户
 */
router.post('/add', async function (req, res) {
  let data = req.body;
  if(!data.gm_username){
    res.json(responseModel.error(null,'用户名不能为空'))
    return;
  }

  if(!data.gm_password){
    res.json(responseModel.error(null,'密码不能为空'))
    return;
  }
  if(data.gm_uid  && data.gm_uid > 0){
    let count = await user.checkUserName(data.gm_username,data.gm_uid);
    if(count > 0){
      res.json(responseModel.error(null,'用户名已存在'))
      return;
    }
  }else{
    data.gm_password = md5(data.gm_password);
  }

  let count = await user.edit(data);
  let result = {
    "count":count,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})

/**
 * 根据gm_uid 获取用户
 */
router.post('/getUser', async function (req, res) {
  let data = req.body;
  if(data.gm_uid  && data.gm_uid > 0){
    let rows = await user.getUserByUid(data.gm_uid);
    let result = {
      "data":rows,
    }
    result = responseModel.success(result,"SUCCESS");
    res.json(result);
    return;
  }else{
    res.json(responseModel.error(null,'非法参数'))
    return;
  }

})

/**
 * 修改用户
 */
router.post('/edit', async function (req, res) {
  let data = req.body;
  if(!data.gm_username){
    res.json(responseModel.error(null,'用户名不能为空'))
    return;
  }
  if(data.gm_uid  && data.gm_uid > 0){
    let count = await user.checkUserName(data.gm_username,data.gm_uid);
    if(count > 0){
      res.json(responseModel.error(null,'用户名已存在'))
      return;
    }
  }
  let count = await user.edit(data);
  let result = {
    "count":count,
  }
  result = responseModel.success(result,"SUCCESS");
  res.json(result);
})


router.post('/del', async function (req, res) {
  let data = req.body;
  if(!data.gm_uids || data.gm_uids.length == 0){
    res.json(responseModel.error(null,'非法参数'))
    return;
  }
  let count = await user.deleteUser(data.gm_uids);
  if(count > 0){
    let result = responseModel.success(null,"SUCCESS");
    res.json(result);
    return;
  }else{
    let result = responseModel.success(null,"SUCCESS");
    res.json(result);
    return;
  }
})


router.post('/resetPassword', async function (req, res) {
  let data = req.body;
  if(!data.gm_uid || data.gm_uid == 0 || !data.newpassword || !data.newpassword1){
    res.json(responseModel.error(null,'非法参数'))
    return;
  }
  if(data.newpassword != data.newpassword1){
    res.json(responseModel.error(null,'两次输入的密码不一致'))
    return;
  }
  let newpassword = md5(data.newpassword);
  let count = await user.resetPassword(data.gm_uid,newpassword);
  if(count > 0){
    let result = responseModel.success(null,"SUCCESS");
    res.json(result);
    return;
  }else{
    let result = responseModel.success(null,"SUCCESS");
    res.json(result);
    return;
  }
})

module.exports = router;
