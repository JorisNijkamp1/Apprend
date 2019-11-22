const express = require('express');
const decks = express.Router();
require('../../../../database/models/deck');
const Users = require('../../../../database/models/user')

decks.get('/', (req, res) => {
    res.json({
        success: true
    })
});

/*====================================
| GET ALL DECKS FROM A USER
*/
decks.get('/:username/decks', async (req, res) => {
    await Users.findOne({ _id: req.params.username }, function (err, user) {
        console.log(req.params.username)
        if (user) {
                return res.json({
                    success: true,
                    decks: user.decks
                })
            }else {
                return res.json({
                    success: false,
                    error: "User doesn't exist"
                })
            }
    });
});

module.exports = decks;
