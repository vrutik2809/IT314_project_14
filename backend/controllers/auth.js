import User from "../models/users.js"
import { generateToken } from "../utils/helper.js"

export const login = async (req, res) => {
    try {
        const { email, password, } = req.body

        const user = await User.findOne({ email, })

        if (user && (await user.validatePassword(password))) {
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                image: user.image,
                token: generateToken(user._id),
            })
        }
        return res.status(401).json({ message: "Invalid email or password", })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}