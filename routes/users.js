var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./pages/signup',{title: 'user sign up'})
});
router.post('/signup', function(req, res, next) {
  // var _user=req.body.user;
  console.log(req.body);
})

module.exports = router;
