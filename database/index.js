require('dotenv').config()

const mongoose = require('mongoose')

module.exports = {
    connect: async () => {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Connected to DB")
    }
}

