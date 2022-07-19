const express = require('express')
const router = express.Router()
const svgCaptcha = require('svg-captcha')
// res.cookie()设置cookie值, req.cookies获取cookie值
// 获取图行验证码
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    inverse: false, // 翻转颜色
    fontSize: 48, // 字体大小
    noise: 2, // 干扰线条数
    width: req.query.width || 150, // 宽度
    height: req.query.height || 50, // 高度
    size: 4, // 验证码长度
    ignoreChars: '0o1il', // 验证码字符中排除 0o1il
    color: true, // 验证码是否有彩色
    background: '#cc9966', // 验证码图片背景颜色
  })
  //保存到cookie,忽略大小写
  res.cookie('captcha', captcha.text.toLowerCase())
  res.type('svg')
  res.send(captcha.data)
})
module.exports = router;
