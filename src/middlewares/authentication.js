'use strict'

module.exports=(req,res,next)=>{
    const jwt=require('jsonwebtoken')
    
    const auth=req.headers?.authorization   // Bearer token
    const accessToken=auth ? auth.split( ' ')[1] : null// ['Bearer', 'Token']

    req.isLogin=false 
    req.user=null

    jwt.verify(accessToken, process.env.ACCESS_KEY, async function(err, userData){
        if(userData){
            req.isLogin=true
            req.user=userData
        }

    })
    next()

}