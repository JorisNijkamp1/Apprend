const express = require('express')
const app = express()
const session = require('express-session')

const http = require('http')
const path = require('path')

const mongoose = require('mongoose')
const db = ''

const httpPort = 3001

const bodyParser = require('body-parser')
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}

const apiRoute = require('./routes/api/api')

app.use(bodyParser.json({limit: '5mb'}))

app.use(cors(corsOptions))

app.options('*', cors())
const sessionParser = session({
    saveUninitialized: false,
    secret: 'kiwi',
    resave: false
})
app.use(sessionParser)

app.use('/api/*', apiRoute)

const httpServer = http.createServer(app)

httpServer.on('upgrade', (req, networkSocket, head) => {
    sessionParser(req, {}, () => {
        wsServer.handleUpgrade(req, networkSocket, head, newWebSocket => {
            wsServer.emit('connection', newWebSocket, req)
        })
    })
})

app.use(express.static(path.join(__dirname, 'client-side')))

httpServer.listen(httpPort,
    function() {
        console.log(`The server is listening on port ${httpPort}`)
    }
)