const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true // doesn't allow 2 users to have the same email address
    },
    password: {
        type: String,
        required: true
    },
    cart: [],
    purchases: [],
    loginActivity: [],
    logoutActivity: []
})

module.exports = mongoose.model("User", userSchema)