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

/*====================================
| SEARCH FOR SOME TAGS
*/
decks.get('/:username/tags', async (req, res) => {
    const searchQuery = req.query.deck;
    const username = req.params.username;
    let foundDecks;

    if (searchQuery) {
        foundDecks = await User.find({
            decks: {
                $elemMatch: {
                    tags: {'$regex': searchQuery, '$options': 'i'}
                }
            }
        });
    } else {
        foundDecks = await User.find({});
    }

    let decks = [];
    foundDecks.forEach((index, key) => {
        foundDecks[key].decks.forEach((decksIndex, decksKey) => {
            if (username === foundDecks[key].decks[decksKey].creatorId) {
                decks.push({
                    name: foundDecks[key].decks[decksKey].name,
                    deckCreator: !(foundDecks[key].email && foundDecks[key]) ? 'anonymous user' : foundDecks[key].decks[decksKey].creatorId,
                    totalFlashcards: foundDecks[key].decks[decksKey].flashcards.length,
                    deckId: foundDecks[key].decks[decksKey]._id,
                    description: foundDecks[key].decks[decksKey].description,
                    tags: foundDecks[key].decks[decksKey].tags
                });
            }
        });
    });

    await res.json({
        decks: decks,
    })
});

/*====================================
| SEARCH FOR SOME DECKS
*/
decks.get('/', async (req, res) => {
    const searchQuery = req.query.deck;
    if (!searchQuery) return res.status(400);

    let searchResult = await User.aggregate([
        {
            $facet: {
                foundUsers: [
                    {$match: {'_id': {'$regex': searchQuery, '$options': 'i'}}},
                    {
                        $project: {
                            "_id": "$_id",
                            "type": "user",
                            "email": "$email"
                        }
                    }
                ],
                foundDecks: [
                    {$unwind: "$decks"},
                    {$match: {'decks.name': {'$regex': searchQuery, '$options': 'i'}, "decks.private": false}},
                    {
                        $project: {
                            "type": "deck",
                            "deck._id": "$decks._id",
                            "deck.name": "$decks.name",
                            "deck.description": "$decks.description",
                            "deck.tags": "$decks.tags",
                            "deck.creatorId": "$decks.creatorId",
                            "deck.flashcards": "$decks.flashcards",
                        }
                    }
                ],
                foundTags: [
                    {$unwind: "$decks"},
                    {$match: {'decks.tags': {'$regex': searchQuery, '$options': 'i'}, "decks.private": false}},
                    {$project: {"tags": "$decks.tags", "type": "tag"}}
                ],
            }
        }
    ]);

    let finalResults = [
        {
            title: 'Users',
            results: []
        },
        {
            title: 'Decks',
            results: []
        },
        {
            title: 'Tags',
            results: []
        }
    ];

    for (var key in searchResult[0]) {
        if (searchResult[0].hasOwnProperty(key)) {
            searchResult[0][key].forEach(result => {
                if (result.type === 'user' && result.email && finalResults[0].results.length < 3) finalResults[0].results.push({
                    name: result._id,
                    type: result.type
                });
                if (result.type === 'deck' && finalResults[1].results.length < 3) finalResults[1].results.push({
                    ...result.deck,
                    type: result.type
                });
                if (result.type === 'tag' && finalResults[2].results.length < 3) finalResults[2].results.push({
                    name: result.tags,
                    type: result.type
                });
            })
        }
    }

    // Change flashcards to total flashcards number
    finalResults[1].results.map((decks, key) => {
        finalResults[1].results[key].flashcards = finalResults[1].results[key].flashcards.length;
        return finalResults;
    });

    // Sort decks on total flashcards
    finalResults[1].results.sort((a, b) => parseFloat(b.flashcards) - parseFloat(a.flashcards));

    // console.log('=========FINAL RESULTS=========')
    // console.log(finalResults[1])

    await res.json({
        message: 'Search results',
        results: finalResults,
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
        if (!req.body.deckName || req.body.deckName.trim().length === 0) return res.status(400).json('Failed to provide a deck name')
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
                columns: req.body.columns
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

        if (!deckId) {
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

        if (userAndDeck.decks[0].private) {
            if (req.session.username !== userAndDeck._id) return res.status(401).json('User has made this deck private')
        }

        const user = await User.findById(userAndDeck.decks[0].creatorId)
        if (user.email.length === 0) userAndDeck.decks[0].LOL = true

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
        res.json({
            success: true
        })
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

/*====================================
| EDIT DECK
*/
decks.put('/:deckId', async (req, res) => {
    try {
        const {deckId} = req.params;
        const {name, description, creatorId, tags} = req.body;

        let user = await User.findById(creatorId)

        if (!user) return res.status(500).json('No such user is known on this server')

        let deckToEdit = await user.decks.id(deckId)

        if (!deckToEdit) return res.status(404).json('Deck not found')

        if (req.session.username) {
            if (req.session.username !== deckToEdit.creatorId) return res.status(401).json('This deck doesnt belong to you')
        } else {
            return res.status(401).json('This deck doesnt belong to you')
        }

        await deckToEdit.editDeck(name, description, tags)
        await user.save()

        return res.status(201).json(deckToEdit)

    } catch (e) {
        console.log(e)
        res.status(500).json('Sorry something went horribly wrong on our end...')
    }

})

decks.post('/:deckId', async (req, res) => {
    try {
        const deckId = req.params.deckId;
        const username = req.session.username ? req.session.username : req.cookies.username;
        let targetUser = await User.findOne({
            "decks._id": deckId
        });
        const importToUser = await User.findById(username)
        const currentDeck = targetUser.decks.id(deckId)

        const newDeck = {...currentDeck._doc}

        delete newDeck.games
        delete newDeck._id

        if (username) {
            if (importToUser._id === targetUser._id) {
                res.status(400).json('Cant import own deck')
            } else {
                newDeck.creatorId = importToUser._id
                const result = await importToUser.importDeck(newDeck, importToUser._id);
                res.status(201).json(result.decks[result.decks.length - 1])
            }
        } else {
            req.session.username = req.session.id
            newDeck.creatorId = req.session.id

            const user = {
                _id: req.session.id,
                email: '',
                password: '',
                decks: [newDeck]
            }
            const cookie = req.cookies.username
            if (cookie === undefined) {
                res.cookie('username', req.session.id, {maxAge: (10 * 365 * 24 * 60 * 60 * 1000)})
            }
            const madeUser = await User.create(user)
            res.status(201).json(madeUser)
        }
    } catch (e) {
        console.log(e)
        res.status(500).json('Something went wrong on our end')
    }

})

module.exports = decks
