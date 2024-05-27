const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config('')

const uri = process.env.DB
async function connectDB() {
    try {
        await mongoose.connect(uri)
        console.log('Database connected')
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectDB