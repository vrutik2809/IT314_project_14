import joi from 'joi'
import mongoose from "mongoose"

const isValidMongoId = mongoose.Types.ObjectId.isValid

export const bodySchema = joi.object({
    name: joi.string().required(),
}).options({
    abortEarly: false, 
})

export const paramSchema = joi.object({
    id: joi.string().required().custom((value, helper) => {
        if(!isValidMongoId(value)){
            return helper.message('Invalid id')
        }
        return value
    }),
})