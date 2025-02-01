// require('dotenv').config();
const { expressjwt }=require('express-jwt');

function authJwt(){
    const secret=process.env.SECRET
    // console.log(secret);
    
    return expressjwt({
        secret:secret,
        algorithms:["HS256"],

    }).unless({
        path:[
            {url: /\/api\/v1\/products(.*)/ , methods:['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/ , methods:['GET', 'OPTIONS']},
            '/api/v1/users/login'
        ]
    })
}

module.exports=authJwt;