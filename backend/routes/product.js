const express=require('express');
const router=express.Router();
const Product=require('../models/product.js')

router.get('/',async (req,res)=>{
    const data=await Product.find();
    console.log(data);
    res.json(data)
    // res.send("Hello World")
})

router.post('/',(req,res)=>{
    const data=req.body
    const product=new Product(data)
    product.save()
    console.log(data);
    res.send("Post request revieved")
})

module.exports=router;