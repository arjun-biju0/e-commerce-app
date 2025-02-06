const express=require('express');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const router=express.Router();

router.get('/',async (req,res)=>{
    const orderList=await Order.find();
    if(!orderList){
        res.status(500).json({success:false})
    }
    res.send(orderList);
})

router.post('/',async(req,res)=>{
    const data=req.body;
    const orderItemIds= Promise.all(req.body.orderItems.map(async (orderItem)=>{
        const newOrderItem= new OrderItem({
            quantity:orderItem.quantity,
            product:orderItem.product
        })
        const result= await newOrderItem.save();
        return result._id;
    }))
    const orderItemIdsResolved=await orderItemIds;

    try {
        const order=new Order({
            orderItems: orderItemIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city: req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:req.body.totalPrice,
            user:req.body.user

        });
        await order.save();
        res.status(200).json({success:true, message:"succesfully saved"})
        
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,error:error.message})
    }
})

module.exports=router;