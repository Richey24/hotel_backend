const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    role: {
        type: Number,
        required: true
    },
    bactive: {
        type: Boolean,
        required: false
    },
    cusname: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    zip: {
        type: Number,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }

}), 'user')

module.exports = User