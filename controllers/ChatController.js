const asyncHandler = require('express-async-handler')
const randomstring = require("randomstring");
const Cryptr = require('cryptr');
const cryptr = new Cryptr('JASI-WJUIM56');

const User = require('../models/User')
const Chats = require('../models/Chats')

// @desc Create chat 
// @route POST /chat
// @access Public
const createChat = asyncHandler(async (req, res) => {
    const chatId = randomstring.generate()
    const { user_id, password, email, target_id } = req.body
    if (!email, !password, !user_id, !target_id) {
        res.status(400)
        throw new Error('Please Add All Fields')
    }

    //Dont send to yourself
    if (user_id === target_id) {
        throw new Error('You wanna send a message for yourself?')
    }

    //Find users
    try {
        firstUser = await User.findById(user_id)
        secondUser = await User.findById(target_id)
    }
    catch {
        throw new Error('ID not found. Make sure you entered a valid id')
    }

    //Create chat field
    await Chats.create({
        chat_id: chatId,
        first_user: firstUser,
        second_user: secondUser
    })
    res.json({
        Message: 'Created. Enjoy!',
        ChatID: chatId,
        success: true
    })
})

// @desc Send a message 
// @route POST /chat/:chat_id
// @access Private
const sendMessage = asyncHandler(async (req, res) => {
    const chatId = req.params.chat_id
    const userId = req.body.user_id
    const message = req.body.message

    const chat = await Chats.findOne({ chat_id: chatId })

    if (chat.first_user._id == userId || chat.second_user._id == userId) {
        chat.messages.push(cryptr.encrypt(message))
        chat.sender_id.push(userId)
        chat.save()
        res.json('sended')
    }
    else{
        throw new Error('You cannot access this chat.')
    }


})

// @desc Show messages
// @route GET /chat/:chat_id
// @access Private
const showMessage = asyncHandler(async (req, res) => {
    const userId = req.body.user_id

    const chatId = req.params.chat_id
    const chat = await Chats.findOne({ chat_id: chatId })

    //Validation for chat security
    if (chat.first_user._id == userId || chat.second_user._id == userId) {
        const chat = await Chats.findOne({ chat_id: chatId })

        let output = []
        for (var i = 0; i < chat.messages.length; i++) {
            let userMessage = await User.findById(chat.sender_id[i])
            output.push(`${userMessage.name} : ${cryptr.decrypt(chat.messages[i])}`)

        }
        res.json(output)
    }
    else {
        throw new Error('You cannot access this chat.')
    }
})





module.exports = { createChat, sendMessage, showMessage }