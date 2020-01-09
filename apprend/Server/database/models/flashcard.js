const mongoose = require('mongoose');
const Column = require('./columns')

//Create schema
const flashcardSchema = new mongoose.Schema({
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
            Column
        ]
    }
});

flashcardSchema.methods.editCard = async function(properties){
    let changes = []
    properties.forEach(property => {
        this[property.name] = property.value
        changes.push(property)
    })
    return changes
}

flashcardSchema.methods.editColumn = async function(data){
    this.columns[data.index].value = data.value
    return this.columns[data.index].value
}

//Create model
mongoose.model("Flashcard", flashcardSchema);

module.exports = flashcardSchema;
