const mongoose = require('mongoose');
const Deck = require('./deck');

//Create schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    decks: {
        type: [{type: Deck}],
    }
});

//Create model
mongoose.model("User", userSchema);

module.exports = userSchema;
