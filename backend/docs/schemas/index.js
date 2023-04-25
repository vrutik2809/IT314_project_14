import authSchema from './auth.js'
import responsesSchema from './responses.js'
import categorySchema from './category.js'
import tableSchema from './table.js'
import productSchema from './product.js'

export default {
    ...authSchema,
    ...responsesSchema,
    ...categorySchema,
    ...tableSchema,
    ...productSchema,
}