var express = require('express'),
    mongoose = require('mongoose'),   
    userModel = require('../model/item'),
    passport = require('passport'),
    itemRouter = express.Router();


itemRouter.route('/test').get(isAuthenticated(), testMethod);

itemRouter.route('/newitem').post(isAuthenticated(), insertItem);
function testMethod(req, res){
    res.send('Hello!');
}

function insertItem(req, res){
    console.log(req.body);
    res.json({message:"all good", code:1});
}

function isAuthenticated(){
    return passport.authenticate('bearer', { session: false });
}
module.exports = itemRouter;