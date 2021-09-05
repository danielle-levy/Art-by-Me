const mongoose = require('mongoose')
const Schema = mongoose.Schema

const personalProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    image_path: {
        type: String,
        required: true,
        unique: true
    },
    image_background: {
        type: String
    }
})

module.exports = mongoose.model("PersonalProduct", personalProductSchema)