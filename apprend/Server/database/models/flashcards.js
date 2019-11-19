const mongoose = require('mongoose');

//Create schema
const flashcardsSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    type: {
        type: String,
    },
    question: {
        type: String,
    }
});

//Create model
mongoose.model("Flashcards", flashcardsSchema);

module.exports = flashcardsSchema;
