var express = require('express'),
    userRouter = require('./api/UserController'),
    itemRouter = require('./api/ItemController'),
    app = express(),
    authController = require('./controller/auth'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://172.25.0.101:27017/subasta');
/*Middleware------------------------------------------ */



app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
  if ('OPTIONS' == req.method) {
      res.send(200);
  } else {
      next();
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.initialize());
app.use(passport.session());

/*Routings------------------------------------------------ */
app.use('/api/user', userRouter);
app.use('/api/item', itemRouter);
/*footer---------------------------------------------------- */

app.get('/', function(req, res) {
  res.send("hello world");
});

app.listen(PORT, function () {
   console.log('server running!... listening port '+PORT); 
});