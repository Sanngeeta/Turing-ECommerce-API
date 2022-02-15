const {
    router
} = require('./routes/router')
const cookie = require('cookie-parser')
const express = require('express')
require('dotenv').config()
const app = express()
app.use(express.json())

app.use(cookie())
app.use('/', router)





app.listen(process.env.APP_PORT, () => {
    console.log('Listening PORT:', process.env.APP_PORT)
})