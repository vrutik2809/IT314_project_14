import { fileURLToPath } from 'url'
import { dirname } from 'path'
import jwt from 'jsonwebtoken'

export const fileDirName = (meta) => {
    const __filename = fileURLToPath(meta.url)

    const __dirname = dirname(__filename)

    return { __dirname, __filename, }
}

export const generateToken = (id) => {
    return jwt.sign({ _id:id, },process.env.JWT_SECRET,{
        expiresIn: '15d',
    })
}