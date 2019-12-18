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
    },
    columns: {
        type: [
            {
                'type': {
                    type: String
                },
                value: {
                    type: String
                }
            }
        ]
    }
});

flashcardSchema.methods.editCard = async function(data){
    this[data.property] = data.value
    return this[data.property]
}

flashcardSchema.methods.editColumn = async function(data){
    this.columns[data.index].value = data.value
    return this.columns[data.index].value
}

//Create model
mongoose.model("Flashcard", flashcardSchema);

module.exports = flashcardSchema;
