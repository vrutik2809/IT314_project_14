import joi from 'joi'
import { bodySchema } from '../../validators/auth.js'

describe('Auth Schema validation', () => {
    it('should throw an error for an empty data', () => {
        const data = {}
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid email format', () => {
        const data = {
            email: 'test',
            password: 'test',
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid data type', () => {
        const data = {
            email: 123,
            password: 123,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should validate successfully', () => {
        const data = {
            email: 'test@email.com',
            password: 'test',
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeUndefined()
        expect(value).toStrictEqual(data)
    })
})
