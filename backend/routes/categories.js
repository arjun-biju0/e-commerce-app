const express=require('express');
const router=express.Router();
const {Category}=require('../models/category.js');

router.get('/',async (req,res)=>{
    const categoryList=await Category.find();
    if(!categoryList){
        return res.status(500).json({success:false})
    }
    res.send(categoryList);
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const category=await Category.findById(id);
        if(!category){
            return res.status(404).json({message:"Category not found"})
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/',async(req,res)=>{
    const data=req.body;
    try {
        const category=new Category(data);
        await category.save();
        res.json({message:"Data saved successfully"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,error:error.message})
    }
})

router.post('/:id',async (req,res)=>{
    const id=req.params.id
    try {
        await Category.findByIdAndDelete(id)
        res.json({message:'Data deleted successfully'})
        
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports=router;