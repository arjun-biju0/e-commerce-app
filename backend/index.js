const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Product=require('./models/Products.js')


app.use(bodyParser.json());
app.use(morgan('tiny'));

mongoose.connect('mongodb+srv://bijuarjun45:jwvfwjvvwu627jv@cluster0.a0ys3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("mongodb connected");
    
}).catch(err=>{
    console.log(err);
    
})

app.get('/api/v1/test',(req,res)=>{
    res.send("Hello World")
})

app.post('/api/v1/name',(req,res)=>{
    const data=req.body
    const product=new Product(data)
    product.save()
    console.log(data);
    res.send("Post request revieved")
})

app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
})
