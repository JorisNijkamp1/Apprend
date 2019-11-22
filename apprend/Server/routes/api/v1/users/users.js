const express = require('express');
const users = express.Router();
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/user');
const User = mongoose.model('User');

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