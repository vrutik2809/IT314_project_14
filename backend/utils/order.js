import Product from '../models/products.js'
import Table from '../models/tables.js'

/* check stock of each product */
export const stock = async (productList) => {
    try {
        for (let idx = 0; idx < productList.length; idx++) {
            const productSearched = await Product.findById(productList[idx].id)
            if (productSearched.stock < productList[idx].quantity) {
                return false
            }
        }
        return true
    } catch (error) {
        throw new Error(error)
    }
}

/* update table */
export const updateTable = async (id, occupied) => {
    try {
        const table = await Table.findById(id)
        table.occupied = occupied
        await table.save()
    } catch (error) {
        throw new Error(error)
    }
}


export const addProductsInOrder = async (order, products) => {
    try {
        await products.forEach(async (product) => {
            await order.addProduct(product)
        })
    } catch (error) {
        throw new Error(error)
    }
}

/* 
Update stock from products
condition
    +1 INCREASE STOCK 
    -1 DECREASE STOCK
*/
export const updateProductsStock = async (products, condition) => {
    try {
        await products.forEach(async (product) => {
            const productToUpdate = await Product.findByIdAndUpdate(product.id,{
                $inc: { stock: (condition >= 1 ? product.quantity : -1 * product.quantity), },
            })
        })
        
    } catch (error) {
        throw new Error(error)
    }
}