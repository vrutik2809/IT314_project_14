import Table from '../models/tables.js'
import Order from '../models/orders.js'

export const getAllTables = async (req, res) => {
    try {
        const pageSize = 5
        const page = Number(req.query.pageNumber) || 1
        const offset = pageSize * (page - 1)
        const keyword = req.query.keyword ? req.query.keyword : ''
        const options = {
            name: { $regex: keyword, $options: 'i', },
        }
        const count = await Table.countDocuments({ $or: [ options ], })
        let tables = await Table.find({ $or: [ options ], }).skip(offset).limit(pageSize)
        tables = tables.map(table => {
            const { _id, ...rest } = table._doc
            return {
                id: _id,
                ...rest,
            }
        })
        return res.status(200).json({ tables, page, pages: Math.ceil(count / pageSize), })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const createTable = async (req, res) => {
    try {
        let table = await Table.create(req.body)
        const { _id, ...rest } = table._doc
        table = {
            id: _id,
            ...rest,
        }
        return res.status(201).json(table)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getTable = async (req, res) => {
    try {
        let table = await Table.findById(req.params.id)
        if (!table) {
            return res.status(404).json({ message: 'Table not found', })
        }
        const { _id, ...rest } = table._doc
        table = {
            id: _id,
            ...rest,
        }
        return res.status(200).json(table)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateTable = async (req, res) => {
    try {
        let table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true, })
        if (!table) {
            return res.status(404).json({ message: 'Table not found', })
        }
        const { _id, ...rest } = table._doc
        table = {
            id: _id,
            ...rest,
        }
        return res.status(200).json(table)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const deleteTable = async (req, res) => {
    try {
        let table = await Table.findByIdAndDelete(req.params.id)
        if (!table) {
            return res.status(404).json({ message: 'Table not found', })
        }

        return res.status(200).json({ message: 'Table deleted', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getTables = async (req, res) => {
    try {
        let  tables = await Table.find({})
        for(let i = 0;i < tables.length;i++) {
            const orders = await Order.find({ table_id: tables[i]._id, })
            const { _id, ...rest } = tables[i]._doc
            tables[i] = {
                id:_id,
                ...rest,
                orders,
            }
        }
        return res.status(200).json(tables)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

