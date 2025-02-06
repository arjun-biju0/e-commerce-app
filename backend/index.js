const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const mongoose=require('mongoose');
const productRouter=require('./routes/products.js');
const categoryRouter=require('./routes/categories.js');
const userRouter=require('./routes/users.js')
const orderRouter=require('./routes/orders.js')
const cors=require('cors');
const authJwt=require('./helpers/jwt.js')
const errorHandler=require('./helpers/error-handler.js')

app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());
app.use(morgan('tiny'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongodb connected");
    
}).catch(err=>{
    console.log(err);
    
})

app.use(authJwt())
app.use(errorHandler)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/categories',categoryRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/orders',orderRouter)


app.listen(3000,()=>{
    console.log("server listening on port 3000");
    
})
