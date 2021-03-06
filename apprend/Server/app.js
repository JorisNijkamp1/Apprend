'use strict';
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const srvConfig = require('./config');

const cors = require('cors');
const apiRoute = require('./routes/api/api');

const app = express();

const fs = require('fs')
const path = require('path')
const stream = require('stream')

//Middleware
app.use(cors({
    // origin: 'http://localhost:3000',
    origin: function(origin, callback){
        return callback(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    secret: 'DFJDFjfkgafjgkf$%dfgjlsdg',
    resave: true
}));

app.use('/', (req, res, next) => {
    if (req.cookies && !req.session.username){
        if (req.cookies.username) req.session.username = req.cookies.username
    }
    next()
})

//Routes
app.use('/api', apiRoute);

// Create HTTP server by ourselves
const httpServer = http.createServer(app);

//ToDo: Websocket upgrade

// Start the server.
const port = 3001;
httpServer.listen(port, () => {
    // mongoose.connect(`mongodb://${srvConfig.USERNAME}:${srvConfig.PASSWORD}@${srvConfig.HOST}:${srvConfig.PORT}/${srvConfig.DB}`, {  // <- Localhost
    mongoose.connect(`mongodb+srv://${srvConfig.USERNAME}:${srvConfig.PASSWORD}@${srvConfig.HOST}/${srvConfig.DB}?retryWrites=true&w=majority`, {   // <- Deployment server
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log(`Server started on port ${port}`);
    });
});
