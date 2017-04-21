var mongoose= require('mongoose');
var bcrypt = require('bcryptjs');

var SALT_NUM=10;


// 构建数据模型
var UserSchema= mongoose.Schema({
   tel: {
        type: Number,
        unique: true
   },
   name:{
        type:String
    },
    createTime:{
        type:Date,
        default: Date.now()+8*60*60*1000
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
UserSchema.pre('save',function(next) {
  var user=this;
  if(this.isNew) {
    this.creatTime=Date.now();
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
UserSchema.methods.comparePass=function(_password,cb) {
    bcrypt.compare(_password,this.password, function(err,isMatch) {
      if(err) return cb(err)
      cb(null,isMatch)
    })
  }

// 添加静态方法,排序，查找。
UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('createTime')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports=UserSchema;