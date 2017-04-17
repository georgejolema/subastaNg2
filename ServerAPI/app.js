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
     cors = require('cors'),
    PORT = process.env.PORT || 5000;
mongoose.connect('mongodb://localhost:27017/subasta');
/*Middleware------------------------------------------ */


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
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