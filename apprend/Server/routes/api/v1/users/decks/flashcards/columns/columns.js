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
require('../../../../../../../database/models/columns')
const Column = mongoose.model('Column')

const auth = require('../../../../../../../authentication/authentication')

// MIDDLEWARE - Check if {columdId} exists
// columns.use('/:columnId/', async (req, res, next) => {
//     req.column = req.flashcard.columns[req.params.columnId]
//     if (!req.column) return res.status(404).json({message: 'Column does not exist'})
//     return next()
// })

columns.use('/:columnId/', async (req, res, next) => {
    req.column = req.flashcard.columns.id(req.params.columnId)
    if (!req.column) return res.status(404).json({message: 'Column does not exist'})
    return next()
})

columns.patch('/:columnId', auth.user, async (req, res) => {
    try {
        const result = await req.column.editColumn(req.body.change)
        req.user.markModified('decks')
        await req.user.save()
        return res.status(201).json({message: 'Changes saved' , data: result, success: true})
    } catch (err){
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }


})

columns.patch('/:columnId', auth.user, async (req, res) => {
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