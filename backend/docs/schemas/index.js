import authSchema from './auth.js'
import responsesSchema from './responses.js'

export default {
    ...authSchema,
    ...responsesSchema,
}