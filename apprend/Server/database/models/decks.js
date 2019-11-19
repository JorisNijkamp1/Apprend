const mongoose = require('mongoose');
const Flashcards = require('./flashcards');

//Create schema
const flashcardSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    creatorId: {
        type: String,
    },
    creationData: {
        type: String, //ToDo: even kijken naar een Datetime type
    },
    lastPlayedDate: {
        type: String, //ToDo: even kijken naar een Datetime type
    },
    status: {
        type: String,
    },
    flashcards: {
        type: [{type: Flashcards}],
    },
});

//Create model
mongoose.model("Flashcards", flashcardSchema);

module.exports = flashcardSchema;
