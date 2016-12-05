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
mongoose.connect('mongodb://localhost:27017/subasta');
/*Middleware------------------------------------------ */

app.use(express.static('node_modules'));
app.use(express.static('dist'));
app.use(express.static('bower_components'));
app.use('/business',express.static('dist/business'));
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

app.get('*', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(PORT, function () {
   console.log('server running!... listening port '+PORT); 
});