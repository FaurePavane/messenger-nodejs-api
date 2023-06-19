const express = require('express')
const router = express.Router()
const protect = require('../middleware/authMiddleware')
const { createChat, sendMessage, showMessage } = require('../controllers/ChatController')

router.post('/', createChat)
router.post('/:chat_id', protect, sendMessage)
router.get('/:chat_id', protect, showMessage)





module.exports = router