const express = require('express');
const v1 = express.Router();
const path = require('path');
const session = require('express-session');
const decksRoute = require('./decks/decks')

v1.get('/', (req, res) => {
    res.json(
        'api/v1...'
    )
});

v1.use('/decks/', decksRoute)

module.exports = v1