const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRouter=require('./routes/product.js');
const categoryRouter=require('./routes/categories.js');
const cors=require('cors');

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));

mongoose.connect('mongodb+srv://bijuarjun45:jwvfwjvvwu627jv@cluster0.a0ys3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log("mongodb connected");
    
}).catch(err=>{
    console.log(err);
    
})

app.use('/api/v1/products',productRouter)
app.use('/api/v1/categories',categoryRouter)


app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
})
