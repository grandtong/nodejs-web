var express = require('express');
var router = express.Router();
var data={
          "title": "标题",
          "category": "分类"
  }
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: "express"});
});

module.exports = router;