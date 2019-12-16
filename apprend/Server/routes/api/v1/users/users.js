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


users.use('/:userId*', async (req, res, next) => {
    if (req.params.userId) req.user = await User.findById(req.params.userId)
    if (!req.user) return res.status(400).json({message: 'User does not exist'})
    return next()
})

users.get('/', async (req, res) => {

    const users = await User.find(
        {$and: [{'email': { $ne : ''}}, {'isPrivate': {$ne : true}}]},
        {'_id': 1, 'signupDate': 1, 'decks': 1, 'profileAvatar': 1}
    )

    const response = users.map(user => (
        {_id: user._id, decks: user.decks.length, avatar: user.profileAvatar, signupDate: user.signupDate }
        ))

    res.status(200).json(response)
});

/*====================================
| GET ALL DECKS FROM A USER
*/
users.get('/:username/decks', async (req, res) => {
    await User.findOne({_id: req.params.username}, function (err, user) {
        if (user) {
            let allowedDecks = [...user.decks]
            if (req.session.username !== user._id){
                allowedDecks = allowedDecks.filter(d => d.private === false)
            }
            return res.json({
                success: true,
                decks: {
                    user: !(user.email && user.password) ? 'anonymous user' : user._id,
                    userId: user._id,
                    decks: allowedDecks
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

    const userWithSameUsername = await User.countDocuments({'_id': req.body.username});

    if (userWithSameUsername !== 0) {
        res.status(409);
        res.json({
            'success': false,
            'error': 'This username is not available, please try again!'
        });

        return;
    }

    const userWithSameEmail = await User.countDocuments({'email': req.body.email});

    if (userWithSameEmail !== 0) {
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
            res.status(201);
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

    const anonymousData = req.session.username ? req.session.username : req.cookies.username;
    const oldUser = await User.findById(anonymousData);

    if (oldUser === null) {
        res.status(404);
        res.json({
            'success': false,
            'error': 'The requested user with the current session data does not exist...'
        });

        return;
    }

    let newDecks = [];

    for (let i = 0; i < oldUser.decks.length; i++) {
        if (anonymousData === oldUser.decks[i].creatorId) {
            newDecks.push(
                new Deck({
                    'name': oldUser.decks[i].name,
                    'description': oldUser.decks[i].description,
                    'creatorId': req.body.username,
                    'creationDate': oldUser.decks[i].creationDate,
                    'lastPlayedDate': oldUser.decks[i].lastPlayedDate,
                    'status': oldUser.decks[i].status,
                    'flashcards': oldUser.decks[i].flashcards,
                    'private': oldUser.decks[i].private
                })
            );
        }
    }

    const newUser = new User({
        '_id': req.body.username,
        'email': req.body.email,
        'password': hashedPassword,
        'decks': newDecks,
        'signupDate': oldUser.signupDate
    });

    await newUser.save();
    await User.deleteOne({'_id': oldUser._id});

    if (req.cookies.username) res.clearCookie('username');
    res.status(201);
    res.json({
        'success': true,
        'user': newUser
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

/*
----------------------------------------------
| Delete a user by its ID.
----------------------------------------------
 */
users.delete('/:id', async (req, res) => {
    const userCount = await User.countDocuments({'_id': req.params.id});

    if (userCount === 0) {
        res.status(404);
        res.json({
            'success': false,
            'error': 'The user could not be found...'
        });

        return;
    }

    User.deleteOne({'_id': req.params.id}).then(() => {
        req.session.destroy();
        res.status(200);
        res.json({
            'success': true
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

users.patch('/:userId/decks/:deckId', async (req, res) => {
    try {
        const { deckId, userId } = req.params

        if (req.session.username !== userId) return res.status(401).json('Not your deck')

        const user = await User.findById(userId)
        const deck = await user.decks.id(deckId)
        if (!deck) return res.status(404).json('No such deck exists')

        const result = deck.toggleStatus()
        user.markModified('decks')
        await user.save()

        res.status(201).json(deck)

    } catch (e) {
        console.log(e)
        res.status(500).status('Something went wrong')
    }
})

users.put('/:userId/decks/:deckId/flashcards/:flashcardId', async (req, res) => {
    try {
        console.log('CARD UPDATO')
        const { userId, deckId, flashcardId} = req.params
        if (req.session.username !== userId) return res.status(401).json({message: 'Not your deck to update'}) //wegwerken in middleware
        const user = await User.findById(userId) //wegwerken in middleware
        const deck = await user.decks.id(deckId) //wegwerken in middleware
        if (!deck) return res.status(404).json({message: 'User doesnt have this deck'})
        const flashcard = await deck.flashcards.id(flashcardId) //wegwerken in middleware
        if (!flashcard) return res.status(404).json({message: 'User doesnt have this flashcard'})
        const updatedFlashcard = await flashcard.editCard(99) //=subdocument methode
        user.markModified('deck')
        const result = await user.save()
        res.status(201).json({
            message: 'Lekker bezig pik', //optioneel
            data: updatedFlashcard
        })
    } catch (e) {
        console.log(e)
        res.status(500).json('Something went horribly wrong...')
    }

})

users.use('/:userId/decks/', decksRoute)