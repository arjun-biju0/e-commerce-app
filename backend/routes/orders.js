const express=require('express');
const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');
const router=express.Router();

router.get('/',async (req,res)=>{
    const orderList=await Order.find().populate('user', 'name');
    if(!orderList){
        res.status(500).json({success:false})
    }
    res.send(orderList);
})

router.get('/:id',async (req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate('user', 'name');
        if(!order){
            return res.status(400).json({message:"Order does not exist"})
        }
        return res.status(200).send(order);
        
    } catch (error) {
       res.status(500).json({error}) 
    }
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

router.put('/:id',async (req,res)=>{
    try {
        const order=await Order.findByIdAndUpdate(req.params.id,{
            status: req.body.status
            },
            {new: true}
        )
        if(!order){
            return res.status(400).send("Order cannot be updated")
        }
        return res.status(200).json({order})
        
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const result =await Order.findByIdAndDelete(req.params.id)
        if(result){
            
            console.log(result.orderItems);
            const result2=result.orderItems.map(async (orderItemId)=>{
                const result2= await OrderItem.findByIdAndDelete(orderItemId)
                return result2
            })
            if(result2){
                return res.status(200).json({
                    success: true,
                    message:"Order deleted successfully"
                })

            }

        }

        return res.status(404).json({success:false, message:"Order not found"})
        
    } catch (error) {
        res.status(500).json({error})
    }
})

module.exports=router;