module.exports={
	isLogin: function(req, res, next){
		if(req.session.user){
			next()
		}
		else
			return res.redirect('/')
		
	},
	isMaster: function(req, res, next){
		next()
	}
}