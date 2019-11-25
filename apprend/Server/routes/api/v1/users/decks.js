const express = require('express');
const decks = express.Router();
require('../../../../database/models/deck');
const Users = require('../../../../database/models/user')

decks.get('/', (req, res) => {
    res.json({
        success: true
    })
});

/*====================================
| GET ALL DECKS FROM A USER
*/
decks.get('/:username/decks', async (req, res) => {
    await Users.findOne({ _id: req.params.username }, function (err, user) {
        if (user) {
                return res.json({
                    success: true,
                    decks: {
                        user: !(user.email && user.password) ? 'anonymous user' : user._id,
                        decks: user.decks
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

decks.get('/:username/decks/:deckName', async (req, res) => {
    await Users.findOne({ _id: req.params.username }, function (err, user) {
        if (user) {
            user.decks.forEach((deck) => {
                if (deck.name === req.params.deckName) {
                    return res.json({
                        success: true,
                        cards: deck.flashcards
                    })
                }
            })
        } else {
            return res.json({
                success: false,
                error: "User doesn't exist"
            })
        }
    });
});

decks.get('/:username/decks/:deckName/flashcard/:cardId', async (req, res) => {
    await Users.findOne({ _id: req.params.username }, function (err, user) {
        if (user) {
            user.decks.forEach((deck) => {
                if (deck.name === req.params.deckName) {
                    deck.flashcards.forEach((card) => {
                        if (card._id === req.params.cardId) {
                            return res.json({
                                success: true,
                                card: card
                            })
                        }
                    })
                }
            })
        } else {
            return res.json({
                success: false,
                error: "User doesn't exist"
            })
        }
    });
});

module.exports = decks;
