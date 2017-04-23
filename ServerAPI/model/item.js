var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
    name:String,
    description:String,
    price: Number,
    brand:String,
    expiration:{year:Number, month:Number, day:Number},
    category: [String],
    status: Number,
    images: [{url:String, thumbnail:String, default:Boolean}],
    user: String
},{collection: 'item'});

module.exports = mongoose.model('item', itemSchema);