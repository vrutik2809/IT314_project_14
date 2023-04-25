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

export const createProduct = async (req, res) => {
    try {
        const { categoryId, ...restBody } = req.body
        const body = {
            category_id: categoryId,
            ...restBody,
        }
        
        const category = await Category.findById(body.category_id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found', })
        }
        let product = await Product.create(body)
        const { _id, ...rest } = product._doc
        product = {
            id: _id,
            ...rest,
        }
        return res.status(201).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id).populate({
            path: 'category_id',
            select: 'name -_id',
        })
        if (!product) {
            return res.status(404).json({ message: 'Product not found', })
        }
        const { _id,category_id, ...rest } = product._doc
        product = {
            id: _id,
            category: category_id,
            ...rest,
        }
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { categoryId, ...restBody } = req.body
        const body = {
            category_id: categoryId,
            ...restBody,
        }
        const category = await Category.findById(body.category_id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found', })
        }
        let product = await Product.findByIdAndUpdate(req.params.id, body, { new: true, })
        if (!product) {
            return res.status(404).json({ message: 'Product not found', })
        }
        const { _id, ...rest } = product._doc
        product = {
            id: _id,
            ...rest,
        }
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found', })
        }
        return res.status(200).json({ message: 'Product deleted', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}