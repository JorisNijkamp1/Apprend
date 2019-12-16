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

decks.use('/:deckId/', async (req, res, next) => {
    console.log('api v1 users decks')
    req.deck = await req.user.decks.id(req.params.deckId)
    if (!req.deck) return res.status(404).json({message: 'Deck does not exist'})
    next()
})

decks.get('/:deckId', async (req, res) => {
    res.status(200).json({data: req.deck})
})

decks.use('/:deckId/flashcards/', flashcardsRoute)

module.exports = decks