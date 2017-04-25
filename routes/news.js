var express = require('express');
var router = express.Router();
var request= require("request")

/* GET users listing. */
router.get('/', function(req, res, next) {
	var options = {
	  url: 'http://wangyi.butterfly.mopaasapp.com/news/api?type=war&page=1&limit=10',
	  headers: {
	    'User-Agent': 'request'
	  }
};
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
 	var list = JSON.parse(body).list;  
 	// console.log(typeof(list))
    res.render('./pages/news',{data: list});
  }
}
 
 // send a request
request(options, callback); 

})

module.exports = router;
