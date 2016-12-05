var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tokenSchema = new Schema({
    userId:String,
    token:String,
    expirationDate:Date,
    status:Number

},{collection:'token'});

module.exports = mongoose.model('token',tokenSchema);