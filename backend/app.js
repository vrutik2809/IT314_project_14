import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'

import swaggerDocument from './config/swagger.js'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import tableRoutes from './routes/table.js' //

dotenv.config()

const app = express()

app.use(morgan('dev',{ skip: (req, res) => process.env.NODE_ENV === 'test', }))
app.use(express.json())
app.use(express.urlencoded({ extended: true, }))

app.use(cors({
    origin: '*', // Allow all origins
}))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', async (req, res) => {
    res.status(200).json({ message: 'Menulize backend', })
})

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/tables', tableRoutes) //



// 404 route
app.use((req, res) => {
    res.status(404).json({ message: 'Not Found', })
})

export default app