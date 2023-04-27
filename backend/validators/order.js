import joi from 'joi'
import mongoose from "mongoose"


const validateMongoID = (value, helper) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid
    
    if(!isValidMongoId(value)){
        return helper.message('Invalid id')
    }

    return value
}

export const bodySchema = joi.object({
    total: joi.number().required(),
    isPaid: joi.boolean(),
    delivery: joi.boolean(),
    note: joi.string().min(0),
    tableId: joi.string().min(0).custom((value, helper) => {
        if(value.length == 0) return true
        const isValidMongoId = mongoose.Types.ObjectId.isValid
        
        if(!isValidMongoId(value)){
            return helper.message('Invalid id')
        }

        return value
    }),
    products: joi.array().items(joi.object({
        id: joi.string().required().custom(validateMongoID),
        quantity: joi.number().required(),
    })).min(1).required(),
}).options({
    abortEarly: false, 
})

export const paramSchema = joi.object({
    id: joi.string().required().custom(validateMongoID),
})