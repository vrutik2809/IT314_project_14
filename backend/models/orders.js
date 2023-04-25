import mongoose from "mongoose"

import OrderProduct from "./order_products.js"

const Schema = mongoose.Schema
const Types = Schema.Types

const OrderSchema = new Schema({
    total: Types.Number,
    isPaid: {
        type: Types.Boolean,
        default: false,
    },
    delivery: {
        type: Types.Boolean,
        default: false,
    },
    note: {
        type: Types.String,
        default: "",
    },
    table_id: {
        type: Types.ObjectId,
        ref: "table",
        default: null,
    },
    user_id: {
        type: Types.ObjectId,
        ref: "user",
    },
    created_at: {
        type: Types.Date,
        default: Date.now(),
    },
    updated_at: {
        type: Types.Date,
        default: Date.now(),
    },
})

OrderSchema.methods.addProduct = async function (product) {
    try {
        const orderProduct = await OrderProduct.create({
            order_id: this._id,
            product_id: product.id,
            quantity: product.quantity,
        })
        return orderProduct
    } catch (error) {
        throw new Error(error)
    }
}

OrderSchema.methods.getAllProducts = async function (products) {
    try {
        let orderProducts = await OrderProduct.find({
            order_id: this._id,
        }).populate({
            path: "product_id",
            populate: {
                path: "category_id",
            },
        })
        
        orderProducts = orderProducts.map((orderProduct) => {
            const { _id, product_id, ...restOrderProduct } = orderProduct._doc
            const { category_id, ...restProduct } = product_id._doc
            
            return {
                id: product_id._id,
                price: product_id.price,
                name: product_id.name,
                stock: product_id.stock,
                product: {
                    category: category_id,
                    ...restProduct,
                },
                ...restOrderProduct,
            }
        })

        return orderProducts
    } catch (error) {
        throw new Error(error)
    }
}

OrderSchema.methods.deleteAllProducts = async function () {
    try {
        await OrderProduct.deleteMany({
            order_id: this._id,
        })
    } catch (error) {
        throw new Error(error)
    }
}

export default mongoose.model("order", OrderSchema, "orders")