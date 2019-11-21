const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/deck');
const Decks = mongoose.model('Deck');
const User = require('../../../../database/models/user')

decks.get('/', (req, res) => {
    res.json(
        'api/vi/decks is the name of the game'
    )
});

/*====================================
| GET ALL DECKS FOR HOMEPAGE
*/
decks.get('/home', async (req, res) => {
    let decks = await Decks.find({}).limit(3);

    const homeDecks = [];

    decks.forEach((deck) => {
        homeDecks.push({
            deckName: deck.name,
            deckDescription: deck.description
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
        if (!req.session.username){
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
            response = await User.create(user)
        } else {
            const player = await User.findById(req.session.username)
            const deck = {
                name: req.body.deckName,
                description: req.body.description,
                creatorId: req.session.username,
                status: 'original',
                flashcards: [],
            }
            response = await player.addDeck(deck)
        }
        console.log(response)

        res.status(201).json(response)
    } catch (e) {
        console.log(e)
        res.status(500).json('Something went horribly wrong...Try again?')
    }

})

module.exports = decks;