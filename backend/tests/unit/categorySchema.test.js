import joi from 'joi'
import { bodySchema } from '../../validators/category.js'

describe('Category Schema validation', () => {
    it('should throw an error for an empty data', () => {
        const data = {}
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should throw an error for an invalid name data type', () => {
        const data = {
            name: 123,
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeInstanceOf(joi.ValidationError)
    })
    it('should validate successfully', () => {
        const data = {
            name: 'Category 1',
        }
        const { error, value, } = bodySchema.validate(data)
        expect(error).toBeUndefined()
        expect(value).toStrictEqual(data)
    })
})
