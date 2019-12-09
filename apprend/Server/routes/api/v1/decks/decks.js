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
        if (!req.body.deckName || req.body.deckName.trim().length === 0) return res.status(400).json('Failed to provide a deck name')
        let response;
        if (!req.session.username && !req.cookies.username) {
            req.session.username = req.session.id
            const deck = {
                name: req.body.deckName,
                description: req.body.description,
                creatorId: req.session.id,
                status: 'original',
                flashcards: [],
                private: req.body.private,
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
                private: req.body.private,
                creatorId: req.session.username ? req.session.username : req.cookies.username,
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

decks.delete('/:deckId', async (req, res) => {
    try {
        const user = await User.findById(req.session.username ? req.session.username : req.cookies.username)
        if (!user) return res.status(404).json('Not a user')
        const result = await user.deleteDeck(req.params.deckId)
        res.status(200).json(result.decks)
    } catch (e) {
        console.log(e)
        res.status(500).json('Something went horribly wrong')
    }
})

/*====================================
| GET A SPECIFIC DECK
*/
decks.get('/:deckId', async (req, res) => {
    try {
    const deckId = req.params.deckId;

    if (!deckId){
        return res.status(404).json('Cant work without a deck id')
    }
    const userAndDeck = await User.findOne({
        'decks': {
            $elemMatch: {
                '_id': deckId
            }
        }
    }, {
        'decks': {
            $elemMatch: {
                '_id': deckId
            }
        }
    })
    if (!userAndDeck) return res.status(404).json('Does not exist')
    if (!userAndDeck.decks) return res.status(404).json('Does not exist')

    if (userAndDeck.decks[0].private){
        if (req.session.username !== userAndDeck._id) res.status(401).json('User has made this deck private')
    } 

    res.status(200).json(userAndDeck.decks[0])
    } catch (e) {
        console.log(e)
        res.status(500).json('oopsie')
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
            creatorId: currentDeck.creatorId,
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
    let username;

    if (req.body.test === true) {
        username = "Joris";
    } else {
        username = req.session.username ? req.session.username : req.cookies.username;
        if (!username) return res.status(401).json('Not a user');
    }

    let user = await User.findOne({_id: username});

    if (!user) {
        console.log('User bestaat niet')
    }

    let newFlashcards = [];
    flashcards.forEach(function (flashcard, key) {
        newFlashcards.push({
            _id: flashcard.id,
            type: "Text only",
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
    } else {
        return await res.json({
            success: false,
            error: "Deck doesn't exist"
        })
    }
});

// Insert game
decks.post('/:deckId/setGame', async (req, res) => {
    let gameId;
    User.find({}, function (err, users) {
        users.forEach((user, userKey) => {
            users[userKey].decks.forEach((deck, deckKey) => {
                if (deck._id == req.params.deckId) {
                    deck.games = {flashcards: req.body.cards, activeCard: req.body.cards[0]}
                    gameId = deck.games[0]._id
                }
            });
            user.save();
        });
        res.json({
            success: true,
            gameId: gameId
        })
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
                            deck.games[0] = {
                                _id: deck.games[0]._id,
                                flashcards: deck.games[0].flashcards,
                                activeCard: req.body.newCard,
                                correctCards: deck.games[0].correctCards.concat(req.body.oldCard),
                                wrongCards: deck.games[0].wrongCards
                            }
                        } else if (req.body.status === "wrong") {
                            deck.games[0] = {
                                _id: deck.games[0]._id,
                                flashcards: deck.games[0].flashcards,
                                activeCard: req.body.newCard,
                                correctCards: deck.games[0].correctCards,
                                wrongCards: deck.games[0].wrongCards.concat(req.body.oldCard)
                            }
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
    let game;
    User.find({}, function (err, users) {
        users.forEach((user, userKey) => {
            users[userKey].decks.forEach((deck, deckKey) => {
                if (deck._id == req.params.deckId) {
                    if (deck.games[0]._id.toString() === req.params.gameId) {
                        game = deck.games
                    }
                }
            });
        });
        if (game[0]._id.toString() === req.params.gameId) {
            res.json({
                success: true,
                game: game
            })
        }
    }).exec();
});

/*====================================
| EDIT DECK
*/
decks.put('/:deckId', async (req, res) => {
    try {
        const {deckId} = req.params;
        const {name, description, creatorId} = req.body;

        let user = await User.findById(creatorId)

        if (!user) return res.status(500).json('No such user is known on this server')

        let deckToEdit = await user.decks.id(deckId)

        if (!deckToEdit) return res.status(404).json('Deck not found')

        if (req.session.username){
            if (req.session.username !== deckToEdit.creatorId) return res.status(401).json('This deck doesnt belong to you')
        } else {
            return res.status(401).json('This deck doesnt belong to you')
        }

        await deckToEdit.editDeck(name, description)
        await user.save()
    
        return res.status(201).json(deckToEdit)
    
    } catch (e) {
        console.log(e)
        res.status(500).json('Sorry something went horribly wrong on our end...')
    }

})

module.exports = decks
