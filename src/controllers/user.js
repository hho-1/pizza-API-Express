'use strict'


const User = require('../models/user')

module.exports={
    list: async (req, res) => {
        const data = await res.getModelList(User)

        res.status(200).send({
            error: false,
            data
        })
    }
}