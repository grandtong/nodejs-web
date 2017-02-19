var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./pages/',{title: 'user sign up'})
});

module.exports = router;
