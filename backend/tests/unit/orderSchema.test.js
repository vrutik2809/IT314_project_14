import joi from 'joi'
import { bodySchema } from '../../validators/order.js'

describe('Product Schema validation', () => {
    it('should throw an error for an empty data', () => {
        const data = {}
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid data format', () => {
        const data = {
            total: '125.75 rupee',
            isPaid: 'false',
            delivery: false,
            note: 123,
            tableId: 'id123',
            products: [
                {
                    id: 'id231',
                    quantity: '2',
                },
                {
                    id: '5f9d88b9d4b7c1b2e4c6f8b0',
                    quantity: 1,
                }
            ],
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for missing required fields', () => {
        const data = {
            total: 125.75,
            isPaid: false,
            delivery: false,
            note: 'Note 1',
            tableId: '5f9d88b9d4b7c1b2e4c6f8b0',
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should validate successfully', () => {
        const data = {
            total: 125.75,
            isPaid: false,
            delivery: false,
            note: 'Note 1',
            tableId: '5f9d88b9d4b7c1b2e4c6f8b0',
            products: [
                {
                    id: '5f9d88b9d4b7c1b2e4c6f8b0',
                    quantity: 2,
                },
                {
                    id: '5f9d88b9d4b7c1b2e4c6f8b0',
                    quantity: 1,
                }
            ],
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeUndefined()
        expect(value).toStrictEqual(data)
    })
})
