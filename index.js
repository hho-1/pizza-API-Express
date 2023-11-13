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

app.use('/users', require('./src/routes/user'))
app.use('/toppings', require('./src/routes/topping'))
app.use('/pizzas', require('./src/routes/pizza'))
app.use('/orders', require('./src/routes/order'))


//errorhandler
app.use(require('./src/middlewares/errorHandler'))



app.listen(PORT, console.log('Server is running on http://' + HOST + ':' + PORT))