import mongoose from "mongoose"

const Schema = mongoose.Schema
const Types = Schema.Types

const CategorySchema = new Schema({
    name: Types.String,
    created_at: {
        type: Types.Date,
        default: Date.now(),
    },
    updated_at: {
        type: Types.Date,
        default: Date.now(),
    },
})

export default mongoose.model("category", CategorySchema, "categories")