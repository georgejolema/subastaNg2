var passport = require('passport');
var moment = require('moment');
var User = require('../model/user');
var Token = require('../model/token');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;

passport.serializeUser(function (user, done) {
        done(null, user);
    });

passport.deserializeUser(function (user, done) {
    done(null, user);
});
passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
  function(username, password, callback) {
    User.findOne({ userName: username }, function (err, user) {     
      if (err) { return callback(err); }
      if (!user) { return callback(null, false); }
      user.verifyPassword(password, function(err, isMatch) {
        if (err) { 
          return callback(err); 
        }
        if (!isMatch) { 
          return callback(null, false); 
        }
       
        return callback(null, user);
      });
    });
  }
));

passport.use(new BearerStrategy(
  function(token, done) {
    
    Token.findOne({ token: token, status:1, expirationDate: {$gte: new Date()} })
    .exec(function (err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false); }
      return done(null, token, { scope: 'all' });
    });
  }
));
