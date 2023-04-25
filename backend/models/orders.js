import mongoose from "mongoose"

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

export default mongoose.model("order", OrderSchema, "orders")