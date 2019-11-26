const express = require('express');
const v1 = express.Router();
const usersRoute = require('./users/users')
const decksRoute = require('./decks/decks')

v1.get('/', (req, res) => {
    res.json(
        'api/v1...'
    )
});

v1.use('/users/', usersRoute);
v1.use('/decks/', decksRoute);

module.exports = v1
