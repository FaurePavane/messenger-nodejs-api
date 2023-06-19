const mongoose = require('mongoose')



const chatsSchema = mongoose.Schema({
    chat_id: {
        type: String,
        required: true
    },
    first_user: {
        type: Object,
        required: [true, 'Enter your id !']
    },
    second_user: {
        type: Object,
        required: [true, 'Enter your friend id !']
    },
    messages: {
        type: Array
    },
    sender_id: {
        type: Array
    }
},
    {
        timestamp: true
    })

module.exports = mongoose.model('Chats', chatsSchema)