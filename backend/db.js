const mongoose = require("mongoose")
require("dotenv").config()

const serverDB = mongoose.connect(process.env.mongo)

module.exports = {
    serverDB
}