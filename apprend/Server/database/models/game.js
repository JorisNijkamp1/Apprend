const mongoose = require('mongoose');
const Flashcard = require('./flashcard');

//Create schema
const gameSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    deckId: {
        type: String,
    },
    flashcards: {
        type: [{type: Flashcard}],
    },
    activeCard: {
        type: [{type: Flashcard}],
    },
    correctCards: {
        type: [{type: Flashcard}],
    },
    wrongCards: {
        type: [{type: Flashcard}],
    },
});

//Create model
mongoose.model("Game", gameSchema);

module.exports = gameSchema;
