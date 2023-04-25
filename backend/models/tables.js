import mongoose from "mongoose"

const Schema = mongoose.Schema
const Types = Schema.Types

const TableSchema = new Schema({
    name: Types.String,
    occupied: {
        type: Types.Boolean,
        default: false,
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

export default mongoose.model("table", TableSchema, "tables")