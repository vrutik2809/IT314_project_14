/**
 * @param {import('joi').Schema} schema
 * @returns {import('express').RequestHandler}
 */
export default (schema,validateIn = 'body') => async (req, res, next) => {
    try {
        if(validateIn === 'body') await schema.validateAsync(req.body)
        else if(validateIn === 'params') await schema.validateAsync(req.params)
        else throw new Error('Invalid validation location')
        next()
    } catch (error) {
        if(error.isJoi){
            const errors = error.details.map((detail) => detail.message)
            return res.status(403).json({ message: 'Validation error',errors, })
        }
        console.log(error)
        return res.status(500).json({ message: 'Internal server error', })
    }
}