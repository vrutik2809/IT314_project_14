import joi from 'joi'
import mongoose from "mongoose"

const validateMongoID = (value, helper) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid
    
    if(!isValidMongoId(value)){
        return helper.message('Invalid id')
    }
}

export const bodySchema = joi.object({
    name: joi.string().required(),
    price: joi.number().min(1).required(),
    categoryId: joi.string().required().custom(validateMongoID),
    stock: joi.number().min(1).integer().required(),
}).options({
    abortEarly: false, 
})

export const paramSchema = joi.object({
    id: joi.string().required().custom(validateMongoID),
})