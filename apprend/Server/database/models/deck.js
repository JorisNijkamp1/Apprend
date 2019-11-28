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
});
deckSchema.methods.editFlashcards = async function(flashcards){
    this.flashcards = flashcards;
    this.markModified('flashcards');
    await this.save();
    return this
};

//Create model
mongoose.model("Deck", deckSchema);

module.exports = deckSchema;
