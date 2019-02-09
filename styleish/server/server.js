
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { translate } = require('./controllers/translate')

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extened: true }))


app.post('/translate', translate)

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
})