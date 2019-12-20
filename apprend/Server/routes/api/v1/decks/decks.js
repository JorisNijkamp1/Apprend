const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/deck');
const Decks = mongoose.model('Deck');
const UserSchema = require('../../../../database/models/user');
require('../../../../database/models/user');
const User = mongoose.model('User');

decks.get('/tags', async (req, res) => {
    try {
        const searchQuery = req.query.tag;
        let foundDecks;
        let decks = [];
    
        if (searchQuery) {
            foundDecks = await User.aggregate([{
                $facet: {
                    foundTags: [
                        {$unwind: "$decks"},
                        {$match: { $or: [ {"decks.private": false}, {"decks.creatorId": req.session.username}], 'decks.tags': searchQuery}},
                        {$project: {"decks": "$decks"}}
                    ],
                }
            }]);
        } else {
            await res.status(400).json({message: 'No query'})
        }
    
        foundDecks[0].foundTags.forEach(deck => {
            decks.push(deck);
        })
        if (decks.length > 0) {
            return res.status(200).json({
                message: 'All decks',
                data: decks
            })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(404).json({message: 'No decks found'})
    }
});

/*====================================
| SEARCH FOR SOME DECKS
*/
decks.get('/', async (req, res) => {
    const searchQuery = req.query.deck;
    let foundDecks;

    if (searchQuery) {
        foundDecks = await User.aggregate([
            {
                "$match": {
                    "decks": {
                        "$elemMatch": {
                            'name': {'$regex': searchQuery, '$options': 'i'}
                        }
                    }
                }
            },
            {'$unwind': '$decks'},
            {
                "$group": {
                    "_id": "$_id",
                    "decks": {"$push": "$decks"}
                }
            }
        ]);
    }

    let decks = [];
    if (foundDecks) {
        foundDecks.forEach((index, key) => {
            foundDecks[key].decks.forEach((decksIndex, decksKey) => {
                decks.push({
                    deckId: foundDecks[key].decks[decksKey]._id,
                    name: foundDecks[key].decks[decksKey].name,
                    description: foundDecks[key].decks[decksKey].description,
                    totalFlashcards: foundDecks[key].decks[decksKey].flashcards.length,
                    deckCreator: foundDecks[key].decks[decksKey].creatorId,
                    private: foundDecks[key].decks[decksKey].private
                });
            });
        });
    }

    //Filter decks
    if (decks) decks = decks.filter(deck => deck.name.toLowerCase().includes(searchQuery.toLowerCase()) && deck.private === false);

    //Sort decks on totalFlashcards
    if (decks) decks = decks.sort((a, b) => b.totalFlashcards - a.totalFlashcards);


    await res.json({
        decks: decks,
    })
});

/*====================================
| GET ALL DECKS FOR HOMEPAGE FROM USERS
*/
decks.get('/home', async (req, res) => {
    try {

        let allDecks
        if (req.session.username) {
            allDecks = await User.aggregate([
                {$unwind: "$decks"},
                {$match: {$and: [{'email': {$ne: ''}}, {'decks.private': false}, {'decks.creatorId': {$ne: req.session.username}}]}},
                {
                    $group: {
                        _id: null,
                        decks: {
                            $push: "$decks"
                        }
                    }
                }
            ])
        } else {
            allDecks = await User.aggregate([
                {$unwind: "$decks"},
                {$match: {$and: [{'email': {$ne: ''}}, {'decks.private': false}]}},
                {
                    $group: {
                        _id: null,
                        decks: {
                            $push: "$decks"
                        }
                    }
                }
            ])
        }

        if (!allDecks[0]) return res.status(404).json('cant find any public deck')
        let decks = []
        if (allDecks[0].decks.length < 3) {
            decks = allDecks[0].decks.map(deck => {
                return deck
            })
        } else {
            const amountOfDecks = 3
            const indexPicked = []
            let infCounter = 0
            for (let i = 0; i < amountOfDecks; i++) {
                const randomIndex = Math.floor(Math.random() * allDecks[0].decks.length)
                if (indexPicked.includes(randomIndex)) {
                    i--
                    infCounter++
                    if (infCounter > 500) break;
                } else {
                    indexPicked.push(randomIndex)
                    decks.push(allDecks[0].decks[randomIndex])
                }
            }
        }
        res.status(200).json(decks)
    } catch (e) {
        console.log(e)
        res.status(500).json('Er gaat iets goed fout')
    }

});

decks.post('/', async (req, res) => {
    try {
        if (!req.body.deckName || req.body.deckName.trim().length === 0) return res.status(400).json({message: 'Failed to provide a deck name'})
        if (req.body.deckName.length > 50) return res.status(400).json({message: 'Deckname is too long, max 50 chars.'})
        let response;
        if (!req.session.username && !req.cookies.username) {
            req.session.username = req.session.id
            const deck = {
                name: req.body.deckName ? req.body.deckName : 'My awesome deck',
                description: req.body.description ? req.body.description : 'Awesome description',
                creatorId: req.session.id,
                status: 'original',
                tags: req.body.tags,
                flashcards: [],
                private: req.body.private,
                columns: req.body.columns ? req.body.columns : ['Text', 'Text']
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
                name: req.body.deckName ? req.body.deckName : 'My awesome deck',
                description: req.body.description ? req.body.description : 'Awesome description',
                private: req.body.private,
                creatorId: req.session.username ? req.session.username : req.cookies.username,
                status: 'original',
                tags: req.body.tags,
                flashcards: [],
                columns: req.body.columns
            }
            if (player) response = await player.addDeck(deck)
            else {
                res.status(401).json({message:'Not a user'})
                return
            }
        }
        res.status(201).json({message: 'You succesfully created a deck' , data: response})

    } catch (e) {
        console.log(e)
        res.status(500).json({message: 'Something went horribly wrong...Try again?'})
    }
});

/*====================================
| GET A SPECIFIC DECK
*/
decks.get('/:deckId', async (req, res) => {
    try {
        const deckId = req.params.deckId;

        if (!deckId) {
            return res.status(404).json({message: 'Cant work without a deck id'})
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
        if (!userAndDeck) return res.status(404).json({message: 'Does not exist'})
        if (!userAndDeck.decks) return res.status(404).json({message: 'Does not exist'})

        if (userAndDeck.decks[0].private) {
            if (req.session.username !== userAndDeck._id) return res.status(401).json({message: 'User has made this deck private'})
        }

        return res.status(200).json({message: 'Found a deck', data: userAndDeck.decks[0]})
    } catch (e) {
        console.log(e)
        return res.status(500).json({message: 'oopsie'})
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
            session: currentDeck.session
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
    const {flashcards} = req.body;
    const {deckId} = req.params;
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
            answer: flashcard.definition,
            sessionPlayed: flashcard.sessionPlayed,
            box: flashcard.box
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
            error: 'Deck doesn\'t exist'
        })
    }
});

decks.put('/:deckId/flashcards/:flashcardId/leitner', async (req, res) => {
    const deckId = req.params.deckId;
    const flashcardId = req.params.flashcardId;
    let username = 'Aaron';

    if (req.body.test === undefined) {
        username = req.session.username ? req.session.username : req.cookies.username;
    }

    if (req.body.answeredCorrect === undefined) {
        res.status(400);
        await res.json({
            'success': false,
            'error': 'The required POST data was not set...'
        });

        return;
    }

    if (!username) {
        res.status(401);
        await res.json({
            'success': false,
            'error': 'You are not a registered user...'
        });

        return;
    }

    let user = await User.findOne({'_id': username});

    if (user === null) {
        res.status(401);
        await res.json({
            'success': false,
            'error': 'You are not a registered user...'
        });

        return;
    }

    let deck = user.decks.find(deck => deck._id.toString() === deckId);

    if (deck === undefined ||
        deck === null) {
        res.status(404);
        await res.json({
            'success': false,
            'error': 'This deck does not exist...'
        });

        return;
    }

    let flashcard = deck.flashcards.find(flashcard => flashcard._id.toString() === flashcardId);

    if (flashcard === undefined ||
        flashcard === null) {
        res.status(404);
        await res.json({
            'success': false,
            'error': 'This flashcard does not exist...'
        });

        return;
    }

    const newDeck = await user.editFlashcardLeitner(deckId, flashcardId, req.body.answeredCorrect);

    await res.json({
        'success': true,
        'deck': newDeck
    });
});

decks.put('/:deckId/session', async (req, res) => {
    const deckId = req.params.deckId;
    let username = 'Aaron';

    if (req.body.test === undefined) {
        username = req.session.username ? req.session.username : req.cookies.username;
    }

    if (req.body.session === undefined) {
        res.status(400);
        await res.json({
            'success': false,
            'error': 'The required POST data was not set...'
        });

        return;
    }

    if (!username) {
        res.status(401);
        await res.json({
            'success': false,
            'error': 'You are not a registered user...'
        });

        return;
    }

    let user = await User.findOne({'_id': username});

    if (user === null) {
        res.status(401);
        await res.json({
            'success': false,
            'error': 'You are not a registered user...'
        });

        return;
    }

    let deck = user.decks.find(deck => deck._id.toString() === deckId);

    if (deck === undefined || deck === null) {
        res.status(404);
        await res.json({
            'success': false,
            'error': 'This deck does not exist...'
        });

        return;
    }

    const editedDecks = await user.editDeckSession(deckId, req.body.session);

    await res.json({
        'success': true,
        'session': editedDecks.session
    });
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
                        if (req.body.status === 'correct') {
                            deck.games[0] = {
                                _id: deck.games[0]._id,
                                flashcards: deck.games[0].flashcards,
                                activeCard: req.body.newCard,
                                correctCards: deck.games[0].correctCards.concat(req.body.oldCard),
                                wrongCards: deck.games[0].wrongCards
                            }
                        } else if (req.body.status === 'wrong') {
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
            // user.save();
        });
        // res.json({
        //     success: true
        // })
    }).exec();
    res.json('ok')
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

module.exports = decks
