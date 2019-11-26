const config = require('../../../../config');
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
    if (req.body.username === undefined ||
        req.body.email === undefined ||
        req.body.password === undefined) {
        res.status(400);
        res.json({
            'success': false,
            'error': 'The required fields were not set, please try again!'
        });
    }

    const userWithSameUsername = await User.findById(req.body.username).select('_id');

    if (userWithSameUsername !== null) {
        res.status(409);
        res.json({
            'success': false,
            'error': 'This username is not available, please try again!'
        });

        return;
    }

    const userWithSameEmail = await User.findOne({'email': req.body.email}).select('email');

    if (userWithSameEmail !== null) {
        res.status(409);
        res.json({
            'success': false,
            'error': 'This E-mail address is not available, please try again!'
        });

        return;
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, config.PASSWORD_SALT);

    if (!req.session.username && !req.cookies.username) {
        const newUser = new User({
            '_id': req.body.username,
            'email': req.body.email,
            'password': hashedPassword
        });

        newUser.save().then(() => {
            res.status(200);
            res.json({
                'success': true,
                'user': newUser
            });
        }).catch(error => {
            console.log(error.message);
            res.status(500);
            res.json({
                'success': false,
                'error': 'Something went wrong while saving the new user...'
            });
        });

        return;
    }

    const user = await User.findById(req.session.username ? req.session.username : req.cookies.username);

    if (user === null) {
        res.status(404);
        res.json({
            'success': false,
            'error': 'The requested user with the current session data does not exist...'
        });

        return;
    }

    user._id = req.body.username;
    user.email = req.body.email;
    user.password = hashedPassword;

    user.save().then(() => {
        res.status(200);
        res.json({
            'success': true,
            'user': user
        });
    }).catch(error => {
        console.log(error.message);
        res.status(500);
        res.json({
            'success': false,
            'error': 'Something went wrong while saving the new user...'
        });
    });
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
