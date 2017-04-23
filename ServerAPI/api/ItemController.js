var express = require('express'),
    mongoose = require('mongoose'),   
    itemModel = require('../model/item'),
    passport = require('passport'),
    itemRouter = express.Router();


itemRouter.route('/newitem').post(isAuthenticated(), insertItem);


function insertItem(req, res){
    var item=req.body.item;
    var itemData=new itemModel(item);
    itemData.save(function(err){
        if(err)res.send(err);
        else
           res.json({message:"all good", code:1});
    });    
}

function isAuthenticated(){
    return passport.authenticate('bearer', { session: false });
}
module.exports = itemRouter;