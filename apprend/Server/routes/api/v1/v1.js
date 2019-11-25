const express = require('express');
const v1 = express.Router();
const path = require('path');
const session = require('express-session');
const decksRoute = require('./decks/decks')
const usersRoute = require('./users/users')

v1.get('/', (req, res) => {
    res.json(
        'api/v1...'
    )
});

v1.use('/users/', usersRoute);
v1.use('/decks/', decksRoute)

module.exports = v1