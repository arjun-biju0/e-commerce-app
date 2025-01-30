const express=require('express');
const router=express.Router();
const Product=require('../models/product.js');
const { Category } = require('../models/category.js');

router.get('/',async (req,res)=>{
    const data=await Product.find();
    console.log(data);
    res.json(data)
    // res.send("Hello World")
})

router.post('/',async (req,res)=>{
    const data=req.body
    const category= new Category.findById(data.category)
    if(!category){
        return res.status(400).send("Invalid Category")
    }
    try {
        const product=new Product(data)
        await product.save()
        res.status(200).send("Post request revieved")
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/get/featured/:count',async (req,res)=>{
    const count=req.params.count? req.params.count:0;
    const featuresProducts= await Product.find({isFeatured:true}).limit(+count);
    if(!featuresProducts){
        return res.status(500).json({success:false})
    }
    res.send(featuresProducts)
})

module.exports=router;