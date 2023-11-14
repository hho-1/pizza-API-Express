'use strict'


const User=require('../models/user')
const jwt=require('jsonwebtoken')
const setToken=require('../helpers/setToken' )

module.exports={

    login: async (req,res)=>{

        const { username, password } = req.body

        if( username && password){

            const user=await User.findOne({username, password})

            if(user){

                if(user.isActive){

                    // res.send({
                    //     error: false,
                    //     token:{
                    //         access: jwt.sign(user.toJSON(),process.env.ACCESS_KEY, { expiresIn:'10m' }),
                    //         // refrersh içine sadece access token elde etmek için yeterli veriler konur
                    //         refresh: jwt.sign({_id:user._id, password:user.password }, process.env.REFRESH_KEY, { expiresIn:'40m' })
                    //     }

                    // })
                    // const data={
                    //     access: user.toJSON(),
                    //     refresh: {_id:user._id, password:user.password },
                    //     accessExpiresIn: '10m',
                    //     refreshExpiresIn: '40m',
                    // }

                    // res.send({
                    //     error: false,
                    //     token:{
                    //         access: jwt.sign(data.access,process.env.ACCESS_KEY, { expiresIn : data.accessExpiresIn }),
                    //         // refrersh içine sadece access token elde etmek için yeterli veriler konur
                    //         refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.refreshExpiresIn })
                    //     }
                    // })

                    res.send({
                        error: false,
                        token: setToken(user)
                    })
                   


                }else{
                    res.errorStatusCode=401
                     throw new Error('user not active')  
                    
                }

            }else{
                res.errorStatusCode=401
                throw new Error('wrong usernama or password')  

            }

        }else{
           
            res.errorStatusCode=401
            throw new Error('enter usernama and password')

        }
        
    },
    
    refresh: async (req,res)=>{ //MAİN

        const refrershToken = req.body?.token?.refresh        

        if(refreshToken){ // token

            jwt.verify( refreshToken,process.env.REFRESH_KEY,async function(err,userData)
            {

                if(err){
                    res.errorStatusCode=401
                    throw err
                }else{

                    const {_id, password}=userData

                    if(_id && password){
                        const user=await User.findOne({ _id })

                        if(user && user.password==password){

                            if(user.isActive){
                 
                                // const data={
                                //     access: user.toJSON(),
                                //     refresh: {_id:user._id, password:user.password },
                                //     accessExpiresIn: '10m',
                                //     refreshExpiresIn: '40m',
                                // }
            
                                // res.send({
                                //     error: false,
                                //     token:{
                                //         access: jwt.sign(data.access,process.env.ACCESS_KEY, { expiresIn : data.accessExpiresIn }),
                                //         // refrersh içine sadece access token elde etmek için yeterli veriler konur
                                //         // refresh: jwt.sign(data.refresh, process.env.REFRESH_KEY, { expiresIn: data.refreshExpiresIn })
                                //     }
            
                                // })     
                                res.send({
                                    error: false,
                                    token: setToken(user, true)
                                })
                                      
            
                            }else{
                                res.errorStatusCode=401
                                 throw new Error('user not active')  
                                
                            }
            

                        }else {
                            res.errorStatusCode=401
                            throw new Error('wrong key')  
                        }

                           
                }else{
                    res.errorStatusCode=401
                    throw new Error('missing id or password')  
                }
                }
            }
            )// token
        }
    },
    logout: async (req,res)=>{ //MAİN
        res.send({
            error: false,
            message: 'no need logout'
        })
    }
}
