const express = require('express');
const users = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../database/models/deck');
require('../../../../database/models/user');
const User = mongoose.model('User');
const Users = require('../../../../database/models/user');
const decks = express.Router();

users.get('/', async (req, res) => {
    const users = await User.find();

    res.json({
        users: users,
        success: true
    })
});

/*====================================
| GET ALL DECKS FROM A USER
*/
users.get('/:username/decks', async (req, res) => {
    await Users.findOne({_id: req.params.username}, function (err, user) {
        if (user) {
            return res.json({
                success: true,
                decks: {
                    user: !(user.email && user.password) ? 'anonymous user' : user._id,
                    decks: user.decks
                }
            })
        } else {
            return res.json({
                success: false,
                error: 'User doesn\'t exist'
            })
        }
    });
});

/*
----------------------------------------------
| Get a user by its ID (username).
----------------------------------------------
 */
users.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user === undefined || user === null) {
        res.json({
            'error': 'The user could not be found...',
            'success': false
        });
    } else {
        res.json({
            'user': user,
            'success': true
        });
    }
});

/*
----------------------------------------------
| Get a user ID by its ID (username)
----------------------------------------------
 */
users.get('/:id/_id', async (req, res) => {
    const user = await User.findById(req.params.id).select('_id');

    if (user === undefined || user === null) {
        res.json({
            'error': 'The user id could not be found...',
            'success': false
        });
    } else {
        res.json({
            '_id': user._id,
            'success': true
        });
    }
});

/*
----------------------------------------------
| Create a new user.
----------------------------------------------
 */
users.post('/', async (req, res) => {
    if (req.body.email === undefined) {
        res.status(400);
        res.json({
            'error': 'The required "email" field was not set...',
            'success': false
        });
    }

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("B4c0/\/", salt);
});

/*
----------------------------------------------
| Get a user E-mail by its E-mail address.
----------------------------------------------
 */
users.post('/email', async (req, res) => {
    if (req.body.email === undefined) {
        res.status(400);
        res.json({
            'error': 'The required "email" field was not set...',
            'success': false
        });
    }

    const user = await User.findOne({'email': req.body.email}).select('email');

    if (user === undefined || user === null) {
        res.json({
            'error': 'The user E-mail could not be found...',
            'success': false
        });
    } else {
        res.json({
            'email': user.email,
            'success': true
        });
    }
});

module.exports = users;
