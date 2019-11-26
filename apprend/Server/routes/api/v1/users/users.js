const express = require('express');
const users = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/deck');
require('../../../../database/models/user');
const User = mongoose.model('User');
const Users = require('../../../../database/models/user');
const decks = express.Router();

users.get('/', (req, res) => {
    res.json({
        success: true
    })
});

/*====================================
| GET ALL DECKS FROM A USER
*/
users.get('/:username/decks', async (req, res) => {
    await Users.findOne({ _id: req.params.username }, function (err, user) {
        if (user) {
            return res.json({
                success: true,
                decks: {
                    user: !(user.email && user.password) ? 'anonymous user' : user._id,
                    decks: user.decks,
                }
            })
        }else {
            return res.json({
                success: false,
                error: "User doesn't exist"
            })
        }
    });
});

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

users.get('/:id/_id', async (req, res) => {
    const user = await User.findById(req.params.id);

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

module.exports = users;
