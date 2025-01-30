const express=require('express');
const { User } = require('../models/user');
const router=express.Router()

router.get('/',async (req,res)=>{
    const userList=await User.find();
    if(!userList){
        res.status(500).json({success:false})
    }
    res.send(userList);
})

router.post('/',async(req,res)=>{
    const data=req.body;
    
    try {
        const user=new User({
            name:data.name,
            email:data.email,
            passwordHash:data.passwordHash,
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