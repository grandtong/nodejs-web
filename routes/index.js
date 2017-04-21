var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var userSchema = require('../src/schemas/userSchema');
/* GET home page. */

var User=mongoose.model('User',userSchema);
router.get('/', function(req, res, next) {
	if(req.session.user){
   		return res.render('index', {title: "home page"});
  	}
  	res.redirect('/user');
});

module.exports = router;