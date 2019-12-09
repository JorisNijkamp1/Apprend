const mongoose = require('mongoose');
const Flashcard = require('./flashcard');
const Game = require('./game');

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
    creationDate: {
        type: Date, default: Date.now
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
    games: {
        type: [{type: Game}],
    },
    private: {
        type: Boolean,
    }
});

deckSchema.methods.editDeck = async function(name, description){
    this.name = name
    this.description = description
}

//Create model
mongoose.model("Deck", deckSchema);

module.exports = deckSchema;
