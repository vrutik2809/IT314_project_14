import authPaths from './auth.js'
import categoryPaths from './category.js'
import tablePaths from './table.js'
import productPaths from './product.js'
import orderPaths from './order.js'
import userPaths from './users.js'

export default {
    ...authPaths,
    ...categoryPaths,
    ...tablePaths,
    ...productPaths,
    ...orderPaths,
    ...userPaths,
}