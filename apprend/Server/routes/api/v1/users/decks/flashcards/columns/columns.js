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

columns.use('/:columnId/', async (req, res, next) => {
    req.column = req.flashcard.columns.id(req.params.columnId)
    if (!req.column) return res.status(404).json({message: 'Column does not exist'})
    return next()
})

columns.patch('/:columnId', auth.user, async (req, res) => {
    try {
        const result = await req.body.props.forEach(prop => {
            req.column.editColumn(prop)
        })
        req.user.markModified('decks')
        await req.user.save()
        return res.status(201).json({message: 'Changes saved' , data: result, success: true})
    } catch (err){
        console.log(err)
        return res.status(500).json({message: 'Something went wrong'})
    }
});

module.exports = columns
