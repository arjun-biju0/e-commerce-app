const express=require('express');
const { User } = require('../models/user');
const bcrypt=require('bcrypt')
const router=express.Router()

router.get('/',async (req,res)=>{
    const userList=await User.find();
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
})

router.get('/:id',async(req,res)=>{
    const id=req.params.id;
    try {
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({message:"Category not found"})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/',async(req,res)=>{
    const data=req.body;
    const hashPassword=await bcrypt.hash(req.body.password,10);
    try {
        const user=new User({
            name:data.name,
            email:data.email,
            passwordHash:hashPassword,
            phone: data.phone,
            isAdmin: data.isAdmin,
            street:data.street,
            apartment: data.apartment,
            zip:data.zip,
            city:data.city,
            country:data.country

        });
        await user.save();
        res.json({message:"Data saved successfully"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,error:error.message})
    }
})

module.exports=router;