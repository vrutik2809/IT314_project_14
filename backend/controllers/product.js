import Product from '../models/products.js'
import Category from '../models/categories.js'

export const getAllProducts = async (req, res) => {
    try {
        const pageSize = 5
        const page = Number(req.query.pageNumber) || 1
        const offset = pageSize * (page - 1)
        const keyword = req.query.keyword ? req.query.keyword : ''
        const options = {
            name: { $regex: keyword, $options: 'i', },
        }
        const count = await Product.countDocuments({ $or: [ options ], })
        let products = await Product.find({ $or: [ options ], }).skip(offset).limit(pageSize).populate({ 
            path: 'category_id',
            select: 'name -_id',
        })
        products = products.map(product => {
            const { _id,category_id, ...rest } = product._doc
            return {
                id: _id,
                category: category_id,
                ...rest,
            }
        })
        return res.status(200).json({ products, page, pages: Math.ceil(count / pageSize), })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}