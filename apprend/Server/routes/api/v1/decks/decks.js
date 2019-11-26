const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/user');
const Users = mongoose.model('User');
const User = require('../../../../database/models/user')

decks.get('/', (req, res) => {
    res.json({
        success: true
    })
});

/*====================================
| GET ALL DECKS FOR HOMEPAGE FROM USERS
*/
decks.get('/home', async (req, res) => {
    let allDecksUsers = await User.find({});

    const homeDecks = [];

    allDecksUsers.forEach((index, key) => {
        allDecksUsers[key].decks.forEach((decksIndex, decksKey) => {
            if (homeDecks.length <= 2) {
                homeDecks.push({
                    deckName: allDecksUsers[key].decks[decksKey].name,
                    deckDescription: allDecksUsers[key].decks[decksKey].description,
                    deckCreator: !(allDecksUsers[key].email && allDecksUsers[key]) ? 'anonymous user' : allDecksUsers[key].decks[decksKey].creatorId,
                    deckUserId: allDecksUsers[key].decks[decksKey].creatorId
                });
            }
        });
    });

    await res.json({
        success: true,
        homeDecks: homeDecks,
    })
});

decks.post('/', async (req, res) => {
    try {
        let response;
        if (!req.session.username && !req.cookies.username) {
            req.session.username = req.session.id
            const deck = {
                name: req.body.deckName,
                description: req.body.description,
                creatorId: req.session.id,
                status: 'original',
                flashcards: [],
            }
            const user = {
                _id: req.session.id,
                email: '',
                password: '',
                decks: [deck]
            }
            const cookie = req.cookies.username
            if (cookie === undefined) {
                res.cookie('username', req.session.id, {maxAge: (10 * 365 * 24 * 60 * 60 * 1000)})
            }
            response = await User.create(user)
        } else {
            const player = await User.findById(req.session.username ? req.session.username : req.cookies.username)
            const deck = {
                name: req.body.deckName,
                description: req.body.description,
                creatorId: req.session.username,
                status: 'original',
                flashcards: [],
            }
            if (player) response = await player.addDeck(deck)
            else {
                res.status(401).json('Not a user')
                return
            }
        }

        res.status(201).json(response)

    } catch (e) {
        console.log(e)
        res.status(500).json('Something went horribly wrong...Try again?')
    }
});

/*====================================
| GET A SPECIFIC DECK
*/
decks.get('/:deckId', async (req, res) => {
    const users = await User.find({});
    const deckId = req.params.deckId;

    let currentDeck, anonymousUser;
    users.forEach((user, userKey) => {
        users[userKey].decks.forEach((deck, deckKey) => {
            if (deck._id == deckId) {
                currentDeck = deck;
                anonymousUser = !(user.email && user.password) ? 'anonymous user' : user._id
            }
        });
    });

    if (currentDeck) {
        await res.json({
            success: true,
            deck: {
                ...currentDeck._doc,
                userName: anonymousUser,
            }
        })
    } else {
        await res.json({
            success: false,
        })
    }
});


/*====================================
| GET ALL FLASHCARDS FROM A DECK
*/
decks.get('/:deckId/flashcards', async (req, res) => {
    const users = await User.find({});
    const deckId = req.params.deckId;

    let currentDeck;
    users.forEach((user, userKey) => {
        users[userKey].decks.forEach((deck, deckKey) => {
            if (deck._id == deckId) {
                currentDeck = deck;
            }
        });
    });

    if (currentDeck) {
        await res.json({
            success: true,
            deckId: currentDeck._id,
            name: currentDeck.name,
            flashcards: currentDeck.flashcards,

        })
    } else {
        await res.json({
            success: false,
        })
    }
});

/*====================================
| EDIT FLASHCARDS OF A DECK
*/
decks.post('/:deckId/flashcards', async (req, res) => {
    
    const { deckId, cards } = req.body
    
    const username = req.session.username ? req.session.username : req.cookies.username
    if (!username) return res.status(401).json('Not a user)'
                                               
    const user = await User.findById(username)
    const result = await user.setCardsToDeck(deckId, cards)
    /*
        
        schema.method(deckId, cards)
            this.decks = this.decks.map(deck => {
                if (deck._id === deckId) deck.flashcards = cards
                return deck
            })
            
            this.markModified('decks')
            await this.save()
            return this
    
    */
    
    // passende response maken
   
    const users = await User.find({});
    const flashcards = req.body.flashcards;

    console.log(flashcards);

    await res.json({
        success: true,
    })
});

module.exports = decks;
