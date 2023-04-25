import Category from '../models/categories.js'

export const getAllCategories = async (req, res) => {
    try {
        const pageSize = 5
        const page = Number(req.query.pageNumber) || 1
        const offset = pageSize * (page - 1)
        const keyword = req.query.keyword ? req.query.keyword : ''
        const count = await Category.countDocuments({ name: { $regex: keyword, $options: 'i', }, })
        const categories = await Category.find({ name: { $regex: keyword, $options: 'i', }, }).skip(offset).limit(pageSize)
        return res.status(200).json({ categories, page, pages: Math.ceil(count / pageSize), })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found', })
        }
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found', })
        }
        category.name = req.body.name
        await category.save()
        return res.status(200).json(category)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) {
            return res.status(404).json({ message: 'Category not found', })
        }
        return res.status(200).json({ message: 'Category deleted', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}
