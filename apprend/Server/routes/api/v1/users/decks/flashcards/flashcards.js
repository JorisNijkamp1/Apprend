const express = require('express');
const path = require('path')
const fs = require('fs')
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../../../database/models/deck');
require('../../../../../../database/models/user');
const User = mongoose.model('User');
const Deck = mongoose.model('Deck');
const Users = require('../../../../../../database/models/user');
const flashcards = express.Router();
// const imagesFolder = 'sep2019-project-kiwi/apprends/Server/files/images'
const imagesFolder = './files/images'

flashcards.use('/:flashcardId/', async (req, res, next) => {
    console.log('api v1 users decks flashcards')
    if (!req.user) return res.status(400).json({message: 'User does not exist'})
    req.flashcard = await req.deck.flashcards.id(req.params.flashcardId)
    if (!req.flashcard) return res.status(404).json({message: 'Flashcard does not exist'})

    next()
})

flashcards.get('/:flashcardId', async (req, res) => {
    res.status(200).json({data: req.flashcard})
})

flashcards.patch('/:flashcardId', async (req, res) => {
    const saveCard = await req.flashcard.editCard(1005)
    req.user.markModified('decks')
    await req.user.save()
    return res.status(201).json({message: 'Edit succes', data: req.flashcard})
})

module.exports = flashcards