
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { translate } = require('./controllers/translate')

const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))

app.get('/translate', translate)

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})