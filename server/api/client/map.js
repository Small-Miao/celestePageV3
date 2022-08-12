const express = require('express')
const mapDao = require('../../dao/client/mapDao.js')
const router = express.Router()


router.get('/getMapScoreList', async function(req, res) {
  let data = req.query;
  let rows  = await mapDao.getMapScoreList(data);
  res.json({
    code: 200,
    data_length: rows.length,
    data: rows
  })
  return;
})

router.get('/getMapList', async function(req, res) {
  let data = req.query;
  if (data.q == "") {
    res.json({
      code: 200,
      dataLength: 0,
      data: []
    })
    return;
  }

  let rows = await mapDao.getMapList(data.q);
  res.json({
    code: 200,
    data_length: rows.length,
    data: rows
  })
  return;
});

router.get('/getMapInfo', async function(req, res) {
  let data = req.query;
  let rows = await mapDao.getMaoInfo(data.sid);
  res.json({
    code: 200,
    data_length: rows.length,
    data: rows
  })
  return;
});

module.exports = router;
