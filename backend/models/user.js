const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number
})

exports.User=mongoose.model('User',userSchema);