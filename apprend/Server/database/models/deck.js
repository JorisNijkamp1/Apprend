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
        type: [String]
    }
});

deckSchema.methods.editDeck = async function(name, description, tags){
    this.name = name
    this.description = description
    this.tags = tags
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

deckSchema.methods.addColumn = async function(name) {
    this.columns.push(name)
    this.flashcards = this.flashcards.map(flashcard => {
        flashcard.columns.push({type: name, value: ''})
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

//Create model
mongoose.model('Deck', deckSchema);

module.exports = deckSchema;
