import joi from 'joi'

export const bodySchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
}).options({
    abortEarly: false, 
})