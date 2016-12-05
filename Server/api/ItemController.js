var express = require('express'),
    mongoose = require('mongoose'),   
    userModel = require('../model/item'),
    passport = require('passport'),
    itemRouter = express.Router();


itemRouter.route('test').get(isAuthenticated(), testMethod)


function testMethod(req, res){
    res.send('Hello!');
}

function isAuthenticated(){
    return passport.authenticate('bearer', { session: false });
}
module.exports = itemRouter;