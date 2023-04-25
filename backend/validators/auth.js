import joi from 'joi'

export const bodySchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
}).options({
    abortEarly: false, 
    allowUnknown: true, // allow unknown keys that will be ignored
})