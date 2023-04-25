import mongoose from "mongoose"
import request from "supertest"
import dotenv from "dotenv"

import app from "../../app.js"

dotenv.config()

const apiClient = request(app)

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    })
},50000)
  
afterAll(async () => {
    await mongoose.connection.close()
})

describe('POST /api/auth/login', () => {
    it('should return 403', async () => {
        const data = {
            email: '',
            password: '123456',
        }
        const res = await apiClient.post('/api/auth/login').send(data)
        expect(res.status).toBe(403)
    })
    it('should return 403', async () => {
        const data = {
            email: 'fake',
            password: '123456',
        }
        const res = await apiClient.post('/api/auth/login').send(data)
        expect(res.status).toBe(403)
    })
    it('should return 200', async () => {
        const data = {
            email: 'admin@example.com',
            password: '123456',
        }
        const res = await apiClient.post('/api/auth/login').send(data)
        expect(res.status).toBe(200)
    })
})
