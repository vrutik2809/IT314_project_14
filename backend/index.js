import mongoose from "mongoose"
import app from "./app.js"

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
}).then(() => {
    console.log('Connected to database.')
}).catch((err) => {
    console.log(err)
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})