'use strict'


const Order = require('../models/order')

module.exports={
    list: async (req, res) => {
        const data = await res.getModelList(Order)

        res.status(200).send({
            error: false,
            detail: await res.getModelListDetails(Order),
            data
        })
    },
    create: async (req, res) => {
        const data = await Order.create(req.body)

        res.status(201).send({
            error: false,
            data
        })
    },
    read: async (req, res) => {
        const data = await Order.findOne({_id: req.params.id})

        res.status(200).send({
            error: false,
            data
        })
    },
    update: async (req, res) => {
        const data = await Order.updateOne({_id: req.params.id}, req.body, {runValidators: true})

        res.status(202).send({
            error: false,
            new: await Order.findOne({_id: req.params.id}),
            data
        })
    },
    delete: async (req, res) => {
        const data = await Order.deleteOne({_id: req.params.id})

        res.status(data.deletedCount ? 202 : 404).send({
            error: false,
            data
        })
    },
}