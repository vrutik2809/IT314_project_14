import mongoose from "mongoose"

const Schema = mongoose.Schema
const Types = Schema.Types

const ProductSchema = new Schema({
    name: Types.String,
    price: Types.Number,
    category_id: {
        type: Types.ObjectId,
        ref: "category",
    },
    stock: Types.Number,
    created_at: {
        type: Types.Date,
        default: Date.now(),
    },
    updated_at: {
        type: Types.Date,
        default: Date.now(),
    },
})

export default mongoose.model("product", ProductSchema, "products")