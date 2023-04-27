import joi from 'joi'
import { bodySchema } from '../../validators/product.js'

describe('Product Schema validation', () => {
    it('should throw an error for an empty data', () => {
        const data = {}
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid name format', () => {
        const data = {
            name: 123,
            price: 10.50,
            categoryId: '5f9d88b9d4b7c1b2e4c6f8b0',
            stock: 10,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid price format', () => {
        const data = {
            name: 'Product 1',
            price: '10 rupee',
            categoryId: '5f9d88b9d4b7c1b2e4c6f8b0',
            stock: 10,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid categoryId format', () => {
        const data = {
            name: 'Product 1',
            price: 10.50,
            categoryId: 'id123',
            stock: 10,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid stock format', () => {
        const data = {
            name: 'Product 1',
            price: 10.50,
            categoryId: '5f9d88b9d4b7c1b2e4c6f8b0',
            stock: 10.12,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should validate successfully', () => {
        const data = {
            name: 'Product 1',
            price: 10.50,
            categoryId: '5f9d88b9d4b7c1b2e4c6f8b0',
            stock: 10,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeUndefined()
        expect(value).toStrictEqual(data)
    })
})
