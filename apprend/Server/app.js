'use strict';
const express = require('express');
const http = require('http');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const db = mongoose.connection;
const srvConfig = require('./config');
require('./database/models/deck');
const Decks = mongoose.model('Deck');
const cors = require('cors');
const apiRoute = require('./routes/api/api');

const app = express();

//Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    secret: 'DFJDFjfkgafjgkf$%dfgjlsdg',
    resave: true
}));

/*====================================
| GET ALL DECKS FOR HOMEPAGE
*/
app.get('/decks', async (req, res) => {
    let decks = await Decks.find({});
    console.log(decks)
    const homeDecks = [];

    decks.forEach((i) => {
        homeDecks.push(i.name);
    });
    console.log(homeDecks)
    await res.json({
        succes: true,
        homeDecks: homeDecks
    })
});

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
