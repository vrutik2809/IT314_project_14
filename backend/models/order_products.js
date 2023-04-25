import mongoose from "mongoose"

const Schema = mongoose.Schema
const Types = Schema.Types

const OrderProductSchema = new Schema({
    order_id: {
        type: Types.ObjectId,
        ref: "order",
    },
    product_id: {
        type: Types.ObjectId,
        ref: "product",
    },
    quantity: Types.Number,
    created_at: {
        type: Types.Date,
        default: Date.now(),
    },
    updated_at: {
        type: Types.Date,
        default: Date.now(),
    },
})

export default mongoose.model("order_product", OrderProductSchema, "order_products")