var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs=require('fs');
var index = require('./routes/index');
var users = require('./routes/users');
var mongoose= require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config=require('./config/default')
mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb);
var app = express();

// 读取数据库模型
var models_path = __dirname + '/src';
var walk = function(path) {
  fs
    .readdirSync(path)
    .forEach(function(file) {
      var newPath = path + '/' + file;
      var stat = fs.statSync(newPath);

      if(stat.isFile()) {
        if(/(.*)\.(js|coffee)/.test(file)) {
          require(newPath);
        }
      }else if(stat.isDirectory()) {
        walk(newPath);
      }
    });
}
// walk(models_path);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: config.session.key,         // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,    // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: false,                    // 设置指每次请求不再重新设置session cookie
  saveUninitialized: true,          // 设置指无论有没有session cookie，每次请求都设置个session cookie
  cookie: {
    maxAge: config.session.maxAge   // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({           // 将 session 存储到 mongodb
    url: config.mongodb             // mongodb 地址
  })
}));

app.use('/', index);
app.use('/user', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
