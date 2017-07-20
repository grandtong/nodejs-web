/**
 * Created by alex on 2017/7/20.
 */
var express = require('express');
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  // if(req.session.user){
  //   return res.redirect('/')
  // }
  // return res.redirect('/user/signin')

  return res.render('./pages/admin');
  // return res.send('222');
  next()
});
module.exports = router;