var express = require('express'),
    mongoose = require('mongoose'),   
    itemModel = require('../model/item'),
    passport = require('passport'),
    itemRouter = express.Router(),
    messageResponse = require('../model/messageResponse');


itemRouter.route('/newitem').post(isAuthenticated(), insertItem);
itemRouter.route('/getitem/:user').get(isAuthenticated(),getItems);



function insertItem(req, res){
    var item=req.body.item;
    var itemData=new itemModel(item);
    itemData.save(function(err){
        if(err)res.send(err);
        else
           res.json(messageResponse.success("Product created successfully",{}));
    });    

}

function getItems(req, res){
    var user=req.params.user;
    //console.log(req.query.access_token);
    itemModel.find({user:user}, function(err, items){
         if (err) 
            res.send(err); 
        res.json(items);
    })
    
}

function isAuthenticated(){
    return passport.authenticate('bearer', { session: false });
}
module.exports = itemRouter;