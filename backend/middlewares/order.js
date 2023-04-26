import Table from '../models/tables.js'
import Product from '../models/products.js'

export const verifyTable = async (req, res, next) => {
    try {
        const { tableId, } = req.body
        const table = await Table.findById(tableId)
        if (!table) {
            return res.status(404).json({ message: 'Table not found', })
        }
        if (table.occupied) {
            return res.status(400).json({ message: 'Table occupied', })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const verifyProducts = async (req, res, next) => {
    try {
        const { products, } = req.body
        for(let idx = 0; idx < products.length; idx++) {
            const product = await Product.findById(products[idx].id)
            if (!product) {
                return res.status(404).json({ message: 'Product not found', })
            }
            if (products[idx].quantity > product.stock) {
                return res.status(400).json({ message: 'Product out of stock', })
            }
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}