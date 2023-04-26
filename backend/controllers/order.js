import Order from "../models/orders.js"

import {
    updateTable,
    addProductsInOrder,
    updateProductsStock
} from "../utils/order.js"

export const createOrder = async (req, res) => {
    try {
        const { tableId, products,...restBody } = req.body
        const orderBody = {
            table_id: tableId.length > 0 ? tableId : null,
            user_id: req.user._id,
            ...restBody,
        }
        let order = await Order.create(orderBody)
        
        await addProductsInOrder(order, products)
        
        if (!order.delivery) {
            await updateTable(order.table_id, true)
        }

        const { _id, ...rest } = order._doc
        order = {
            id: _id,
            ...rest,
        }

        await updateProductsStock(products, -1)

        return res.status(201).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const pageSize = 5
        const page = Number(req.query.pageNumber) || 1
        const offset = pageSize * (page - 1)
        const keyword = req.query.keyword ? req.query.keyword : ''
        const delivery = Boolean(req.query.delivery) || false
        const options = {}
        if(delivery){
            options.delivery = delivery
        }

        const count = await Order.countDocuments({ $or: [ options ], })

        let orders = await Order.find({ $or: [ options ], }).populate({
            path: 'table_id',
        }).populate({
            path: 'user_id',
            select: '-password',
        }).skip(offset).limit(pageSize)

        orders = orders.map(order => {
            const { _id, table_id, user_id, ...rest } = order._doc
            return {
                id: _id,
                table: table_id,
                user: user_id,
                ...rest,
            }
        })

        return res.status(200).json({ orders, page, pages: Math.ceil(count / pageSize), })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id).populate({
            path: 'table_id',
        }).populate({
            path: 'user_id',
            select: '-password',
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found', })
        }

        const order_products = await order.getAllProducts()

        const { _id, table_id, user_id, ...rest } = order._doc
        order = {
            id: _id,
            table: table_id,
            user: user_id,
            order_products,
            ...rest,
        }
        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate({
            path: 'table_id',
        }).populate({
            path: 'user_id',
            select: '-password',
        })
        if (!order) {
            return res.status(404).json({ message: 'Order not found', })
        }

        const { tableId, products, } = req.body
        order.delivery = req.body.delivery
        order.note = req.body.note
        order.user_id = req.user._id

        if(order.table_id !== tableId){
            if(!order.table_id && ! req.body.delivery){
                /* DELIVERY -> TABLE */
                await updateTable(tableId, true)
                order.table_id = tableId
            }   
            else if(order.table_id && req.body.delivery){
                /* TABLE -> DELIVERY */
                await updateTable(order.table_id, false)
                order.table_id = null
            }
            else{
                /* TABLE -> TABLE */
                await updateTable(order.table_id, false)
                await updateTable(tableId, true)
                order.table_id = tableId
            }
        }

        const order_products = await order.getAllProducts()

        if(order_products.length > 0){
            const mappedProducts = order_products.map(product => {
                return {
                    id: product._id,
                    quantity: product.quantity,
                }
            })

            // increment the stock of old products
            await updateProductsStock(mappedProducts, 1)

            // delete old products
            await order.deleteAllProducts()

            // add new products
            await addProductsInOrder(order, products)

            // decrement the stock of new products
            await updateProductsStock(products, -1)
        }

        order.total = req.body.total

        const updatedOrder = await order.save()
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Order not found', })
        }
        return res.status(200).json({ message: 'Order deleted', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateOrderPay = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Order not found', })
        }
        if(order.table_id){
            await updateTable(order.table_id, false)
        }
        order.isPaid = true
        const updatedOrder = await order.save()
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateOrderDelivery = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
        if (!order) {
            return res.status(404).json({ message: 'Order not found', })
        }
        order.delivery = !order.delivery
        const updatedOrder = await order.save()
        return res.status(200).json(updatedOrder)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getStatistics = async (req, res) => {
    try {
        let TODAY_START = new Date()
        TODAY_START  = new Date(Date.UTC(TODAY_START.getUTCFullYear(), TODAY_START.getUTCMonth(), TODAY_START.getUTCDate()))
        const NOW = new Date()

        let sales = await Order.find({ isPaid: true, }).populate({
            path: 'table_id',
        }).populate({
            path: 'user_id',
            select: '-password',
        })

        for(let i = 0; i < sales.length; i++) {
            const order_products = await sales[i].getAllProducts()

            const { _id, table_id, user_id, ...rest } = sales[i]._doc
            sales[i] = {
                id: _id,
                table: table_id,
                user: user_id,
                order_products,
                ...rest,
            }
        }

        const totalSales = await Order.aggregate([
            { $match: { isPaid: true, }, },
            {
                $group: {
                    _id: null,
                    sum: { $sum: '$total', },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            }
        ])

        const deliveriesMade = await Order.count({
            delivery: true,
            isPaid: true,
        })

        const totalOrdersPaid = await Order.count({
            isPaid: true,
        })

        const todaySales = await Order.aggregate([
            { $match: { isPaid: true, created_at: { $gte: TODAY_START, $lte: NOW, }, }, },
            {
                $group: {
                    _id: null,
                    sum: { $sum: '$total', },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            }
        ])

        const totalOrders = await Order.count({})

        let orders = await Order.find({ isPaid: false, }).populate({
            path: 'table_id',
        }).populate({
            path: 'user_id',
            select: '-password',
        })

        for(let i  = 0;i < orders.length;i++) {
            const order_products = await orders[i].getAllProducts()

            const { _id, table_id, user_id, ...rest } = orders[i]._doc
            orders[i] = {
                id: _id,
                table: table_id,
                user: user_id,
                order_products,
                ...rest,
            }
        }

        return res.status(200).json({
            statistics: {
                total: (totalSales.length > 0 ? totalSales[0].sum : 0),
                today: (todaySales.length > 0 ? todaySales[0].sum : 0),
                orders: totalOrdersPaid,
                deliveries: deliveriesMade,
            },
            sales,
            orders,
            totalOrders,
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}