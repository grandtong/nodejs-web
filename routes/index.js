var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var userSchema = require('../src/schemas/userSchema');
/* GET home page. */

var User=mongoose.model('User',userSchema);
router.get('/', function(req, res, next) {

  res.render('index', {title: "express"});
});

module.exports = router;