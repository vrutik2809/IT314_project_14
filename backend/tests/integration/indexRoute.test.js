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

describe('Get /', () => {
    it('should return 200', async () => {
        const res = await apiClient.get('/')
        expect(res.status).toBe(200)
    })
})