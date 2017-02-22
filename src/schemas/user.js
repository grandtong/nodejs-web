var mongoose= require('mongoose');
var bcrypt=require('bcrypt-nodejs');

var SALT_NUM=10;
mongoose.connect("mongodb://localhost/nodeNews")

// 构建数据模型
var userSchema= mongoose.Schema({
   name:{
        type:String,
        unique:true
    },
    creatTime:{
        type:Date,
        default:Date.now()
    },
    password: {
      type: String
    },
    role: {
      type: Number,
      default: 0
    }
});

// 密码保存之前加盐
userSchema.pre('save',function(next) {
  var user=this;
  if(this.isNew) {
    this.creatTime=Data.now()
  }
  bcrypt.genSalt(SALT_NUM, function(err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})
// 添加密码验证方法
userSchema.methods={
  comparePass:function(_password,cb) {
    bcrypt.compare(_password,this.password, function(err,isMatch) {
      if(err) returncb(err)
      cb(null,isMatch)
    })
  }
}
// 添加静态查询方法
userSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports=userSchema;