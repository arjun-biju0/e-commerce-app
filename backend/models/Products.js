const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    countInStock:{type:Number}
})

const Product=mongoose.model('Product',productSchema);
module.exports=Product;