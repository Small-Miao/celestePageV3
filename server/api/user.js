const express = require('express')
const log = require('../log')
const router = express.Router();
router.get('/test', function (req, res) {
  log.info( 'API', '/HelloWorld', 'GET', "request!");
  res.json({
    msg: "Hello World!111"
  });
})
module.exports = router;
