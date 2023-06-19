const express = require('express')
const dotenv = require('dotenv').config()
const UserRouter = require('./routes/UserRoutes')
const ChatRouter = require('./routes/ChatRoutes')

const connectDB = require('./config/db')

const port = process.env.PORT
connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.use('/users', UserRouter)
app.use('/chat', ChatRouter)


app.listen(port, () => {
    console.log(`server is listenning to ${port}`)
})