const express = require('express');
const path = require('path')
const fs = require('fs')
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../../../database/models/deck');
require('../../../../../../database/models/user');
require('../../../../../../database/models/flashcard');

const User = mongoose.model('User');
const Deck = mongoose.model('Deck');
const flashcards = express.Router();
const columnsRoute = require('./columns/columns')
const Flashcard = mongoose.model('Flashcard')

const auth = require('../../../../../../authentication/authentication')

flashcards.post('/', async (req, res) => {
    try {
        const copyColumnsFromDeck = req.deck.columns.map(column =>{
            return {type: column.type, value: '' }
        } )
        console.log(copyColumnsFromDeck)
        const result = await req.deck.addFlashcard(copyColumnsFromDeck)
        req.user.markModified('decks')
        await req.user.save()
        return res.status(201).json({message: 'You have created a new flascard', data: result})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
})

flashcards.use('/:flashcardId/', async (req, res, next) => {
    req.flashcard = await req.deck.flashcards.id(req.params.flashcardId)
    if (!req.flashcard) return res.status(404).json({message: 'Flashcard does not exist'})
    return next()
})

flashcards.get('/:flashcardId', async (req, res) => {
    return res.status(200).json({message: 'Ok', data: req.flashcard})
})

flashcards.patch('/:flashcardId', async (req, res) => {
    try {
        const { properties } = req.body
        if (!properties) return res.status(400).json({message: 'No properties to change!'})
        const saveCard = await req.flashcard.editCard(properties)
        req.user.markModified('decks')
        await req.user.save()
        return res.status(201).json({message: 'Edit was succesfull!', data: saveCard})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Something went wrong on our end'})
    }
})

flashcards.use('/:flashcardId/columns/', columnsRoute)

module.exports = flashcards