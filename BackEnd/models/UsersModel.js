const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    avatar: String,
    phone: {
        type: Number,
        require: true,
    },
    firstname: {
        type: String,
        require:true,
    },
    lastname: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true,
    },
    confirm: {
        type: String,
        required: true,
    },

})

module.exports = mongoose.model("UserModel", userSchema)