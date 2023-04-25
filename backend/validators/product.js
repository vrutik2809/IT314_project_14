import joi from 'joi'
import mongoose from "mongoose"

const validateMongoID = (value, helper) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid
    
    if(!isValidMongoId(value)){
        return helper.message('Invalid id')
    }
}