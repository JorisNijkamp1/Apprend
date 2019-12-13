const mongoose = require('mongoose');

//Create schema
const flashcardSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    type: {
        type: String,
    },
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
    box: {
        type: Number,
        default: 0
    },
    sessionPlayed: {
        type: Number,
        default: 0
    }
});

flashcardSchema.methods.editCard = async function(sessionNumber){
    this.sessionPlayed = sessionNumber
}

//Create model
mongoose.model("Flashcard", flashcardSchema);

module.exports = flashcardSchema;
