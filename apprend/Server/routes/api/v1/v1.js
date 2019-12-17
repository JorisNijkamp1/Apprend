const express = require('express');
const v1 = express.Router();
const path = require('path');
const session = require('express-session');
const decksRoute = require('./decks/decks')
const usersRoute = require('./users/users')
const loginRoute = require('./login/login')

v1.get('/', (req, res) => {
    res.json(
        'api/v1...'
    )
});

// Gets an image from the file system root/files/images/:pathParam
v1.get('/images/:pathParam', async (req, res) => {
    res.sendFile(`${req.params.pathParam}`, {root: path.join(__dirname, '../../../files/images')})
})

v1.use('/decks/', decksRoute)
v1.use('/users/', usersRoute)
v1.use('/login/', loginRoute)

module.exports = v1
