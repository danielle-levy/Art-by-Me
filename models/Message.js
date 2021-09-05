const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: Object
    },
    sent_at: {
        type: String
    }
})

module.exports = mongoose.model("Message", messageSchema)