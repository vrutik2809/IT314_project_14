import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import mongoose from 'mongoose'

import swaggerDocument from './config/swagger.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true, }))

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log('Connected to database.')
}).catch((err) => {
    console.log(err)
})

app.use(cors()) // Allow all origins

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Menulize backend', })
})

// 404 route
app.use((req, res) => {
    
    res.status(404).json({ message: 'Not Found', })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})