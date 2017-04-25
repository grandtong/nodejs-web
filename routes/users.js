var express = require('express');
var userSchema = require('../src/schemas/userSchema');
var router = express.Router();
var mongoose=require('mongoose');
var User=mongoose.model('User',userSchema);
/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    return res.redirect('/')
  }
  return res.redirect('/user/signin')
});
router.get('/signin', function(req, res, next) {
  if(req.session.user){
    res.render('./index')
  }
  else{
    res.render('./pages/signup',{title: 'signin page'})
  }
});
router.get('/signup', function(req, res, next) {
  res.render('./pages/signup',{title: 'signup page'})
});
router.get('/signout', function(req, res, next) {
  req.session.user=null
  return res.redirect('/user/signin')
});
router.post('/signup', function(req, res, next) {
  console.log('post signup now')
  var tel=req.body.tel;
  var name=req.body.name;
  var password=req.body.password;
  var repassword=req.body.repassword;
  
  if(password===repassword){
    var _user = {
      tel: tel,
      name: name,
      password: password
    }
    var user=new User(_user);
    user.save(function(err){
    if(err) return console.log('save err'+err);
    console.log('save sucess');
  })
   req.session.user=user
     return  res.redirect('/');
  }
    return  res.redirect('/user/signin');
})

router.post('/signin', function(req, res, next) {
  console.log("post signin now~~~~~~")
  // var _user=req.body.user;
  var tel = req.body.tel;
  console.log(req.body)
  var name = req.body.name;
  var password = req.body.password;

  User.findOne({tel: tel}, function(err, user) {
    console.log("database "+user)
    if (err) {
      console.log(err)
    }
    if (!user) {
      console.log("can't find tel")
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
        return res.redirect('/user/signin')
      }
    })
  })
})

module.exports = router;