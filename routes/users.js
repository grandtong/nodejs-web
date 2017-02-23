var express = require('express');
var userSchema = require('../src/schemas/userSchema');
var router = express.Router();
var mongoose=require('mongoose');
var User=mongoose.model('User',userSchema);
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('./pages/signup',{title: 'user sign up'})
});
router.get('/signup', function(req, res, next) {
  res.render('./pages/signinerr',{title: '用户名输入错误'})
});

router.post('/signup', function(req, res, next) {
  var name=req.body.name;
  var password=req.body.password;
  var repassword=req.body.repassword;
  console.log(req.session);
  var _user = {
		  name: name,
	    password: password
	}
  if(password===repassword){
    var user=new User(_user);
    user.save(function(err){
    if(err) return console.log('save err');
    console.log('save sucess');
    console.log(req.body);
  })
   return res.redirect('/'); //不加return会报错，can't set header after they are send'
}
 return  res.redirect('/user');
  
  
  
})

router.post('/signin', function(req, res, next) {
  // var _user=req.body.user;
  var name = req.body.name;
  var tel = req.body.tel;
  var password = req.body.password;

  User.findOne({name: name}, function(err, user) {
    if (err) {
      console.log(err)
    }
    if (!user) {
      return res.redirect('/user/signup')
    }
    user.comparePass(password, function(err, isMatch) {
      if (err) {
        console.log(err)
      }
      if (isMatch) {
        req.session.user = user
        console.log(req.session)
        return res.redirect('/')
      }
      else {
        return res.redirect('/user')
      }
    })
  })
})

module.exports = router;