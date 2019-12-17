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
        type: Number
    },
    sessionPlayed: {
        type: Number
    }
});

flashcardSchema.methods.editCard = async function(data){
    this[data.property] = data.value
    return this[data.property]
}

//Create model
mongoose.model("Flashcard", flashcardSchema);

module.exports = flashcardSchema;
