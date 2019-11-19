const mongoose = require('mongoose');
const Deck = require('./deck');

//Create schema
const usersSchema = new mongoose.Schema({
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
mongoose.model("Users", usersSchema);

module.exports = usersSchema;
