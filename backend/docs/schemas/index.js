import authSchema from './auth.js'
import responsesSchema from './responses.js'
import categorySchema from './category.js'
import tableSchema from './table.js'
import productSchema from './product.js'
import orderSchema from './order.js'

export default {
    ...authSchema,
    ...responsesSchema,
    ...categorySchema,
    ...tableSchema,
    ...productSchema,
    ...orderSchema,
}