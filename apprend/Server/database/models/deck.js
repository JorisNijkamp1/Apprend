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
    tags: {
        type: [],
    },
    flashcards: {
        type: [{type: Flashcard}],
    },
    games: {
        type: [{type: Game}],
    },
    private: {
        type: Boolean, default: false
    },
    session: {
        type: Number,
        default: 0
    }, 
    columns: {
        type: [{'type': {type: String}, name: {type: String} }]
    },
    imported: {
        type: [{'user': {type: String}, 'deckId': {type: String}, 'importDate': {type: Date, default: Date.now} }]
    },
    originalDeck: {
        type: String
    }
});

deckSchema.methods.editDeck = async function(properties){
    properties.forEach(property => {
        this[property.name] = property.value
    })
}

deckSchema.methods.toggleStatus = async function(){
    this.private = !this.private
}

deckSchema.methods.editFlashcardLeitner = async function (flashcardId, answeredCorrect, sessionPlayed) {
    this.flashcards = this.flashcards.map(flashcard => {
        if (flashcard._id.toString() === flashcardId) {
            if (answeredCorrect) {
                switch (flashcard.box) {
                    case 0:
                        flashcard.box = 2;
                        break;
                    case 1:
                        flashcard.box = 2;
                        break;
                    case 2:
                        flashcard.box = 3;
                        break;
                    default:
                        flashcard.box = 3;
                        break;
                }
            }

            if (!answeredCorrect) flashcard.box = 1;
            flashcard.sessionPlayed = sessionPlayed;
        }

        return flashcard;
    });

    this.markModified('flashcards');
    await this.save();
    return this;
};

deckSchema.methods.addColumn = async function(column) {
    this.columns.push({type: column.type, name: column.name})
    this.flashcards = this.flashcards.map(flashcard => {
        flashcard.columns.push({type: column.type, value: ''})
        return flashcard
    })

    return this
}

deckSchema.methods.deleteColumn = async function(id) {
    this.columns = this.columns.filter((column, index) => {
        return index.toString() !== id
    })
    this.flashcards = this.flashcards.map(flashcard => {
        flashcard.columns = flashcard.columns.filter((column, index) => {
            return index.toString() !== id
        })
        return flashcard
    })

    return this
}

deckSchema.methods.addFlashcard = async function(columns){
    this.flashcards.push({columns: columns})
    return this.flashcards[this.flashcards.length - 1]
}

deckSchema.methods.deleteFlashcard = async function(id){
    this.flashcards = this.flashcards.filter(fc => fc._id.toString() !== id)
}

deckSchema.methods.updateImported = async function(deck){
    this.imported.push({user: deck.creatorId, deckId: deck._id})
}

deckSchema.methods.updateOriginalDeck = async function(id){
    this.originalDeck = id
}

//Create model
mongoose.model('Deck', deckSchema);

module.exports = deckSchema;
