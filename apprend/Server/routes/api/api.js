const express = require('express');
const api = express.Router();
const path = require('path');
const session = require('express-session');

api.get('/', (req, res) => {
    res.json({
        success: true
    })
});

module.exports = api;
