const express = require('express');
const path = require('path')
const fs = require('fs')
const session = require('express-session');
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
require('../../../../../../../database/models/deck');
require('../../../../../../../database/models/user');
const User = mongoose.model('User');
const Deck = mongoose.model('Deck');
const columns = express.Router();

const auth = require('../../../../../../../authentication/authentication')

// MIDDLEWARE - Check if {columdId} exists
columns.use('/:columnId/', async (req, res, next) => {
    req.column = req.flashcard.columns[req.params.columnId]
    if (!req.column) return res.status(404).json({message: 'Column does not exist'})
    return next()
})

columns.patch('/:columnId', async (req, res) => {
    try {
        const { columnId } = req.params
        const { column } = req.body
        const data = {
            index: columnId,
            value: column.value
        }
        const result = await req.flashcard.editColumn(data)
        req.user.markModified('decks')
        await req.user.save()
        return res.status(201).json({message: 'Changes saved' , data: result, success: true})
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
})

module.exports = columns