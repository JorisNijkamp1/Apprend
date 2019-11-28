const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/deck');
const Decks = mongoose.model('Deck');
const UserSchema = require('../../../../database/models/user')
require('../../../../database/models/user')
const User = mongoose.model('User')

decks.get('/', (req, res) => {
    res.json({
        success: true
    })
});

/*====================================
| GET ALL DECKS FOR HOMEPAGE FROM USERS
*/
decks.get('/home', async (req, res) => {
    let allDecksUsers = await User.find({}).sort({signupDate: 'desc'});

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
            creatorId:  currentDeck.creatorId,
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
    const { flashcards } = req.body;
    const { deckId } = req.params;

    const username = req.session.username ? req.session.username : req.cookies.username;
    if (!username) return res.status(401).json('Not a user');

    let user = await User.findOne({_id: username});

    if (!user) {
        console.log('User bestaat niet')
    }

    let newFlashcards = [];
    flashcards.forEach(function (flashcard, key) {
        newFlashcards.push({
            _id: flashcard.id,
            type: 'text-only',
            question: flashcard.term,
            answer: flashcard.definition
        })
    });

    let currentDeck, deckFound;
    user.decks.forEach(function (deck, key) {
        if (deck._id == deckId) {
            currentDeck = key;
            deckFound = true;
        }
    });

    if (deckFound) {
        user.decks[currentDeck].flashcards = newFlashcards;

        return user.save(async function (err) {
            if (err) return console.error(err);
            return await res.json({
                success: true,
                deck: user.decks[currentDeck]
            })
        })
    }else {
        return await res.json({
            success: false,
            error: "Deck doesn't exist"
        })
    }
});

// Insert game
decks.post('/:deckId/setGame', async (req, res) => {
    User.find({}, function (err, users) {
        users.forEach((user, userKey) => {
            users[userKey].decks.forEach((deck, deckKey) => {
                if (deck._id == req.params.deckId) {
                    deck.games = {flashcards: req.body.cards, activeCard: req.body.cards[0]}
                    res.json({
                        success: true,
                        gameId: deck.games._id
                    })
                }
            });
            user.save();
        });
    }).exec();
});

// Update game
decks.put('/:deckId/updateGame', async (req, res) => {
    User.find({}, function (err, users) {
        users.forEach((user, userKey) => {
            users[userKey].decks.forEach((deck, deckKey) => {
                if (deck._id == req.params.deckId) {
                    if (deck.games[0]._id == req.body.gameId) {
                        if (req.body.status === "correct") {
                            deck.games[0] = {flashcards: deck.games[0].flashcards, activeCard: req.body.newCard, correctCards: deck.games[0].correctCards.concat(req.body.oldCard), wrongCards: deck.games[0].wrongCards}
                        } else if (req.body.status === "wrong") {
                            deck.games[0] = {flashcards: deck.games[0].flashcards, activeCard: req.body.newCard, correctCards: deck.games[0].correctCards, wrongCards: deck.games[0].wrongCards.concat(req.body.oldCard)}
                        }
                    }
                }
            });
            user.save();
        });
    }).exec();
});

// Get data from a specific game
decks.get('/:deckId/games/:gameId', async (req, res) => {
    const users = await User.find({});
    users.forEach((user, userKey) => {
        users[userKey].decks.forEach((deck, deckKey) => {
            if (deck.games._id === req.body.gameId) {
                res.json({
                    success: true,
                    game: deck.games
                })
            }
        });
    });
});

module.exports = decks;
