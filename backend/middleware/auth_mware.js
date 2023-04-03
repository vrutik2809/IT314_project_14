import jwt from "jsonwebtoken"
import User from "../models/users.js"
import User from "../models/users.js"

export const protect = async (req, res, next) => {
    let token
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            //[0] = Bearer , [1] = token
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findOne({ _id: decoded._id, }).select("-password")
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized", })
            }
            next()
        }
        if (!token) {
            return res.status(401).json({ message: "Not authorized", })
        }
        next()
    } catch (error) {
        console.log(error)
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired", })
        }
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token", })
        }
        return res.status(500).json({ message: "Internal Server Error", })
    }
    if (!token) {
        return res.status(401).json({ message: "Not authorized", })
    } 

}

export const admin = async (req, res, next) => {
    if (req.user && req.user.is_admin) {
        next()
    } else {
        return res.status(401).json({ message: "Not authorized as an admin", })
    }
}
    