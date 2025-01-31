// require('dotenv').config();
const { expressjwt }=require('express-jwt');

function authJwt(){
    const secret=process.env.SECRET
    // console.log(secret);
    
    return expressjwt({
        secret:secret,
        algorithms:["HS256"],

    })
}

module.exports=authJwt;