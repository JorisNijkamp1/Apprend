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
const columns = express.Router();

const auth = require('../../../../../../authentication/authentication')

// MIDDLEWARE - Check if {columdId} exists
columns.use('/:columnId/', async (req, res, next) => {
    req.column = req.deck.columns[req.params.columnId]
    if (!req.column) return res.status(404).json({message: 'Column does not exist'})
    return next()
})

columns.post('/', async (req, res) => {
    try {
        const { column  } = req.body
        const result = await req.deck.addColumn(column)
        req.user.markModified('decks')
        await req.user.save()
        res.status(201).json({message: column, data: req.deck})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
})

columns.patch('/:columnId', async (req, res) => {
    try {
        req.deck.columns[req.params.columnId].name = req.body.column.value
        req.user.markModified('decks')
        await req.user.save()
        return res.status(200).json({message: 'Edit ok', data: req.deck.columns[req.params.columnId].name})
    } catch (err){
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
})

columns.delete('/:columnId', async (req, res) => {
    try {
        const result = await req.deck.deleteColumn(req.params.columnId)
        req.user.markModified('decks')
        await req.user.save()
        res.status(200).json({message: 'Delete ok', data: req.deck})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = columns