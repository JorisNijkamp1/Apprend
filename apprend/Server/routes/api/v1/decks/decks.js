const express = require('express');
const decks = express.Router();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
require('../../../../database/models/deck');
const Decks = mongoose.model('Deck');

decks.get('/', (req, res) => {
    res.json(
        'api/vi/decks is the name of the game'
    )
});

/*====================================
| GET ALL DECKS FOR HOMEPAGE
*/
decks.get('/home', async (req, res) => {
    let decks = await Decks.find({});
    console.log(decks)
    const homeDecks = [];

    decks.forEach((i) => {
        homeDecks.push(i.name);
    });
    console.log(homeDecks)
    await res.json({
        success: true,
        homeDecks: homeDecks
    })
});

module.exports = decks;