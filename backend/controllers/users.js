import User from '../models/users.js'
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            is_admin: req.body.is_admin ? req.body.is_admin : false,
            image: req.body.image ? req.body.image : '/avatar.png',
        })
        return res.status(201).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found', })
        }
        const { _id, ...rest } = user._doc
        user = {
            id: _id,
            ...rest,
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const updateUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found', })
        }
        const { id, name, email, password, passwordCheck, image, } = req.body

    
        if (!(await user.validatePassword(passwordCheck))) {
            return res.status(400).json({ message: 'Invalid password', })
        }
        user.name = name
        user.email = email
        user.image = image ? image : user.image
        if(password) user.password = password
        const updatedUser = await user.save()
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found', })
        }
        return res.status(200).json({ message: 'User deleted successfully', })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}