const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');

decks.get('/', (req, res) => {
    res.json(
        'api/vi/decks is the name of the game'
    )
});

module.exports = decks;