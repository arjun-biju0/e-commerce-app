// require('dotenv').config();
const { expressjwt }=require('express-jwt');

function authJwt(){
    const secret=process.env.SECRET
    // console.log(secret);
    
    return expressjwt({
        secret:secret,
        algorithms:["HS256"],
        isRevoked: isRevoked

    }).unless({
        path:[
            {url: /\/api\/v1\/products(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methods:['GET', 'OPTIONS']},
            '/api/v1/users/login',
            '/api/v1/users/register'
        ]
    })
}
async function isRevoked(req,token) {
    // console.log(payload);
    
    if(!token.payload.isAdmin){
        return true
    }
    return false
}

module.exports=authJwt;