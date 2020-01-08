const config = require('../../../../config');
const express = require('express');
const users = express.Router();
const path = require('path')
const fs = require('fs')
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../database/models/deck');
require('../../../../database/models/user');
const User = mongoose.model('User');
const Deck = mongoose.model('Deck');
const Users = require('../../../../database/models/user');
const decks = express.Router();
const decksRoute = require('./decks/decks')
// const imagesFolder = 'sep2019-project-kiwi/apprends/Server/files/images'
const imagesFolder = './files/images'

/*
|---------------------------------------------
| Get a user by its ID (username).
|---------------------------------------------
 */
users.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user === undefined || user === null) {
            return res.status(404).json({
                'message': 'The user could not be found...'
            });
        }

        return res.status(200).json({
            'data': user,
            'message': 'The user has been found!'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            'message': error.message
        });
    }
});

/*
|---------------------------------------------
| Get a user ID by its ID (username)
|---------------------------------------------
 */
users.get('/:id/_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('_id');

        if (user === undefined || user === null) {
            return res.status(404).json({
                'message': 'The user ID could not be found...'
            });
        }

        return res.status(200).json({
            'data': user._id,
            'message': 'The user ID has been found!'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            'message': error.message
        });
    }
});

/*
|---------------------------------------------
| Get a user E-mail by its E-mail address.
|---------------------------------------------
 */
users.post('/email', async (req, res) => {
    try {
        if (req.body.email === undefined) {
            return res.status(400).json({
                'message': 'The required post data was not set...'
            });
        }

        const user = await User.findOne({'email': req.body.email}).select('email');

        if (user === undefined || user === null) {
            res.status(404).json({
                'message': 'The user E-mail could not be found...'
            });
        }

        return res.status(200).json({
            'data': user.email,
            'message': 'The user E-mail has been found!'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            'message': error.message
        });
    }
});

const auth = require('../../../../authentication/authentication')

users.use('/:userId*', async (req, res, next) => {
    if (req.params.userId) req.user = await User.findById(req.params.userId)
    if (!req.user) return res.status(400).json({message: 'User does not exist'})
    if (req.cookies && req.cookies.username && !req.session.username && req.user.email.length === 0) req.session.username = req.cookies.username
    return next()
})

users.get('/', async (req, res) => {

    const users = await User.find(
        {$and: [{'email': {$ne: ''}}, {'isPrivate': {$ne: true}}]},
        {'_id': 1, 'signupDate': 1, 'decks': 1, 'profileAvatar': 1}
    )

    const response = users.map(user => (
        {_id: user._id, decks: user.decks.length, avatar: user.profileAvatar, signupDate: user.signupDate}
    ))

    res.status(200).json(response)
});

/*====================================
| GET ALL DECKS FROM A USER
*/
// users.get('/:username/decks', async (req, res) => {
//     await User.findOne({_id: req.params.username}, function (err, user) {
//         if (user) {
//             let allowedDecks = [...user.decks]
//             if (req.session.username !== user._id) {
//                 allowedDecks = allowedDecks.filter(d => d.private === false)
//             }
//             return res.json({
//                 success: true,
//                 decks: {
//                     user: !(user.email && user.password) ? 'anonymous user' : user._id,
//                     userId: user._id,
//                     decks: allowedDecks
//                 }
//             })
//         } else {
//             return res.json({
//                 success: false,
//                 error: 'User doesn\'t exist'
//             })
//         }
//     });
// });

/*
|---------------------------------------------
| Create a new user.
|---------------------------------------------
 */
users.post('/', async (req, res) => {
    try {
        if (req.body.username === undefined ||
            req.body.email === undefined ||
            req.body.password === undefined) {
            return res.status(400).json({
                'message': 'The required post data was not set...'
            });
        }

        const userWithSameUsername = await User.countDocuments({'_id': req.body.username});
        const userWithSameEmail = await User.countDocuments({'email': req.body.email});
        const hashedPassword = bcrypt.hashSync(req.body.password, config.PASSWORD_SALT);

        if (userWithSameUsername !== 0) {
            return res.status(409).json({
                'message': 'This username is not available, please try again!'
            });
        }

        if (userWithSameEmail !== 0) {
            return res.status(409).json({
                'message': 'This E-mail address is not available, please try again!'
            });
        }

        if (!req.session.username && !req.cookies.username) {
            const newUser = new User({
                '_id': req.body.username,
                'email': req.body.email,
                'password': hashedPassword
            });

            newUser.save().then(() => {
                return res.status(201).json({
                    'data': newUser,
                    'message': 'The new account has been created!'
                });
            }).catch(error => {
                console.log(error.message);
                return res.status(500).json({
                    'message': 'Something went wrong while saving the new user...'
                });
            });

            return;
        }

        const oldUser = await User.findById(req.session.username);

        if (oldUser === null) {
            return res.status(404).json({
                'message': 'The requested user with the current session data does not exist...'
            });
        }

        const newUser = new User({
            '_id': req.body.username,
            'email': req.body.email,
            'password': hashedPassword,
            'decks': [],
            'signupDate': oldUser.signupDate
        });

        await newUser.save();
        await newUser.convertDecks(req.session.username, oldUser.decks);
        await User.deleteOne({'_id': oldUser._id});

        if (req.cookies.username) res.clearCookie('username');
        return res.status(201).json({
            'data': newUser,
            'message': 'The anonymous user has been converted to a new account!'
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            'message': error.message
        });
    }
});

/*
|---------------------------------------------
| Delete a user by its ID.
|---------------------------------------------
 */
users.delete('/:id', async (req, res) => {
    try {
        const userCount = await User.countDocuments({'_id': req.params.id});

        if (userCount === 0) {
            return res.status(404).json({
                'message': 'The user could not be found...'
            });
        }

        User.deleteOne({'_id': req.params.id}).then(() => {
            req.session.destroy();
            return res.status(200).json({
                'data': true,
                'message': 'The user has been deleted!'
            });
        }).catch(error => {
            console.log(error.message);
            return res.status(500).json({
                'message': 'Something went wrong while deleting the user...'
            });
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            'message': error.message
        });
    }
});


// users.patch('/:userId/decks/:deckId', async (req, res) => {
//     try {
//         const { deckId, userId } = req.params

//         if (req.session.username !== userId) return res.status(401).json('Not your deck')

//         const user = await User.findById(userId)
//         const deck = await user.decks.id(deckId)
//         if (!deck) return res.status(404).json('No such deck exists')

//         const result = deck.toggleStatus()
//         user.markModified('decks')
//         await user.save()

//         res.status(201).json(deck)
//     } catch (e) {
//         console.log(e)
//         res.status(500).status('Something went wrong')
//     }
// })

users.use('/:userId/decks/', decksRoute)

module.exports = users;