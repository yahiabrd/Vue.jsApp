const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const users = require('./routes/api/users')
app.use('/api/users', users)

//prod
//if (process.env.NODE_ENV === 'production') {
app.use(express.static(__dirname + '/public/'))

app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
//}

const port = 5000
app.listen(port, () => console.log("server started"))