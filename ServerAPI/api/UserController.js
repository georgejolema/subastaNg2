var express = require('express'),
    mongoose = require('mongoose'),   
    userModel = require('../model/user'),
    passport = require('passport'),
    moment = require('moment'),
    Token = require('../model/token'),
    uuid = require("uuid-lib"),
    userRouter = express.Router(),
    bcrypt = require('bcrypt-nodejs'),
    events = require('events');
userRouter.route('/login').post(passport.authenticate('local'), login);
userRouter.route('/logout').get(logout);
userRouter.route('/profile')
    .all(function (req, res, next) {
        if (!req.user) {
            res.status(417).send('Invalid user');
        }
        else
            next();
    }).get(profile);
userRouter.route('/register').post(register);
userRouter.route('/update').post(isAuthenticated(), update);
userRouter.route('/reload').post(isAuthenticated(), reload);
userRouter.route('/validatepassword').post(isAuthenticated(), validatePassWord);

function isAuthenticated(){
    return passport.authenticate('bearer', { session: false });
}
function login(req, res){
    res.redirect('/api/user/profile');
}
function logout(req, res){
    var token=req.query.access_token;
    Token.update({token:token}, {status:0} ,function(err){
        if(err)res.send(err);
        else{
            res.send('User logged out successfully');
        }
    });
}
function profile(req, res){
        var tokenValue = uuid.raw();
        var tokenData=new Token({
            userId:req.user._id,
            token:tokenValue,
            expirationDate: new moment(new Date()).add(1, 'day').toDate(),
            status:1
        });
        tokenData.save(function(err){            
            if(err) res.send(err);
            else
            {
                res.json({userData: req.user, token:tokenValue});
            } 
        });
    
}
function register(req, res){
    var user=req.body.user;
    user.password=req.body.password;
    var userData=new userModel(user);
    userData.save(function(err){        
        if(err) res.send(err);
        else        
            req.login(user, function(){
                res.redirect('/api/user/profile');
            });        
    });
}
function update(req, res){
    var user=req.body.user;       
    var password = req.body.password;
    if(password != null && password != '') 
       hashPassword(password, function(hash){
           user.password = hash;
            sendResponse(res, userModel, user);
       })
    else    
        sendResponse(res, userModel, user);    
    function sendResponse(res, userModel, user){
         userModel.update({userName:user.userName},user, function(err){
            if(err)res.send(err);
            else
                res.send(user);
        });
    }
}
function reload(req, res){
    var userName = req.body.userName;
    userModel.findOne({userName:userName}, function(err, user){
        if (err) { res.send(err); }
        if (!user) { res.send('User not found'); }
        res.json(user);           
    });
}
function validatePassWord(req, res){
    var userName=req.body.userName;
    var password=req.body.password;
    userModel.findOne({userName:userName}, function(err, user){
        if (err) 
            res.send(err); 
        user.verifyPassword(password, function(err, isMatch) {
            if (err) 
                res.status(500).send('Server error');             
            if (!isMatch) 
                res.status(417).send('invalid user'); 
            else
                res.json(user);            
        });           
    });
}
function hashPassword(password, callBack){
     bcrypt.genSalt(5, function(err, salt){
        if(err)throw "Invalid hash operation";
        bcrypt.hash(password, salt, null, function(err, hash){            
            callBack(hash);        
        });
    });
}
module.exports = userRouter;