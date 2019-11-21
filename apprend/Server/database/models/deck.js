const mongoose = require('mongoose');
const Flashcard = require('./flashcard');

//Create schema
const deckSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    creatorId: {
        type: String,
    },
    creationDates: {
        type: Date,
    },
    lastPlayedDate: {
        type: Date,
    },
    status: {
        type: String,
    },
    flashcards: {
        type: [{type: Flashcard}],
    },
});

//Create model
mongoose.model("Deck", deckSchema);

module.exports = deckSchema;
