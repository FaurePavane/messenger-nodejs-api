const mongoose = require('mongoose')



const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    user_id: {
        type: String,
        required: [true, 'Please enter an id'],
        minLength: [5, 'Short username']
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('User', userSchema)