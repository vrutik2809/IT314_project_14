import mongoose from "mongoose"
import bcrypt from "bcrypt"

const Schema = mongoose.Schema
const Types = Schema.Types

const UserSchema = new Schema({
    name: Types.String,
    email: Types.String,
    password: Types.String,
    is_admin: {
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

UserSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model("user", UserSchema, "users")