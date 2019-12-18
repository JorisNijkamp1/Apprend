const express = require('express');
const path = require('path')
const fs = require('fs')
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../../database/models/deck');
require('../../../../../database/models/user');
const User = mongoose.model('User');
const Deck = mongoose.model('Deck');
const Users = require('../../../../../database/models/user');
const decks = express.Router();
// const imagesFolder = 'sep2019-project-kiwi/apprends/Server/files/images'
const imagesFolder = './files/images'
const flashcardsRoute = require('./flashcards/flashcards')
const columnsRoute = require('./columns/columns')

decks.use('/:deckId/', async (req, res, next) => {
    req.deck = await req.user.decks.id(req.params.deckId)
    if (!req.deck) return res.status(404).json({message: 'Deck does not exist'})
    if (req.session.username === req.user._id || req.deck.private === false) return next()
    return res.status(401).json({message: 'This deck is private'})
})

decks.get('/:deckId', async (req, res) => {
    res.status(200).json({data: req.deck})
})

decks.use('/:deckId/flashcards/', flashcardsRoute)
decks.use('/:deckId/columns/', columnsRoute)

module.exports = decks