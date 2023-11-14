'use strict'

//!Pizza Api

const express = require('express')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 8000
const HOST = process.env.HOST || '127.0.0.1'

require('express-async-errors')

//find-sort-pagination
app.use(require('./src/middlewares/findSearchSortPage'))

//json
app.use(express.json()) 

//middleware



/* app.use((req, res, next) => {
    const jwt = require('jsonwebtoken')

    const auth = req.headers?.authorization     //bearer and token
    const accessToken = auth ? auth.split(' ')[1] : null

    req.isLogin = false
    req.user = null

    jwt.verify( refreshToken,process.env.REFRESH_KEY,async function(err,userData){
        if(userData){
            req.isLogin = true,
            req.user = userData
        }
    })
    next()
}) */

app.use(require('./src/middlewares/authentication'))

app.all('/', (req, res) => {
    res.send({
        error: false,
        message: 'Pizza API Project'
    })
})

//dbConnection
const {dbConnection} = require('./src/configs/dbConnection')
dbConnection()

//Routes

app.use('/auth', require('./src/routes/auth'))


app.use('/users', require('./src/routes/user'))
app.use('/toppings', require('./src/routes/topping'))
app.use('/pizzas', require('./src/routes/pizza'))
app.use('/orders', require('./src/routes/order'))


//errorhandler
app.use(require('./src/middlewares/errorHandler'))



app.listen(PORT, console.log('Server is running on http://' + HOST + ':' + PORT))