var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema=new Schema({
    userName:{
        type:String,
        unique:true,
        required:true
    },
    firstName:String,
    lastName:String,
    password:{
        type:String,
        required:true
    },
    email:String,
    birthDate:{year:Number, month:Number, day:Number},
    address:[{address:String, zipCode:String, phoneNumber:String, name:String}],
    cards:[{name:String}]
},{ collection: 'user' });

userSchema.pre('save',function(fn){
    var user = this;
    if(!user.isModified('password'))return fn();
    bcrypt.genSalt(5, function(err, salt){
        if(err)return fn(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err) return fn(err);
            user.password=hash;
            fn();
        });
    });
});



userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) { 
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('user',userSchema);