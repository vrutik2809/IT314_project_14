import authSchema from './auth.js'
import responsesSchema from './responses.js'
import categorySchema from './category.js'

export default {
    ...authSchema,
    ...responsesSchema,
    ...categorySchema,
}