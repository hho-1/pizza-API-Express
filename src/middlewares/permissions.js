/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
//! Persmission Middleware
'use strict'
module.exports={

    isLogin: (req, res, next)=>{
        // next()
        if(req.isLogin){
            next()
        }else{
            res.errorStatusCode=403
            throw new Error('No permission, you must login')
        }
    },
    isAdmin: (req, res, next)=>{
        
        if(req.isLogin && req.user.isAdmin){
            next()
        }else{
            res.errorStatusCode=403
            throw new Error('No permission, you must be admin')
        }
    },
}