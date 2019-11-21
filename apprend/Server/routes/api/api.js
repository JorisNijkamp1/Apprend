const express = require('express');
const api = express.Router();
const path = require('path');
const session = require('express-session');
const v1Route = require('./v1/v1')

api.get('/', (req, res) => {
    res.json({
        success: true
    })
});

api.use('/v1/', v1Route)

module.exports = api;
