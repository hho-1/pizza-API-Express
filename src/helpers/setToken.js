"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// pset token:
const jwt=require('jsonwebtoken')

module.exports=function(userData, isRefresh=false){
    const data={
        access: userData.toJSON(),
        refresh: {_id:userData._id, password:user.password },
        accessExpiresIn: '10m',
        refreshExpiresIn: '40m',
    }

    if(isRefresh)
    return {   
            access: jwt.sign(data.access,process.env.ACCESS_KEY, { expiresIn : data.accessExpiresIn }),
            // refrersh içine sadece access token elde etmek için yeterli veriler konur
            refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.refreshExpiresIn })
     
    }
    else
        return {   
        access: jwt.sign(data.access,process.env.ACCESS_KEY, { expiresIn : data.accessExpiresIn }),

 
}


}


   
                   