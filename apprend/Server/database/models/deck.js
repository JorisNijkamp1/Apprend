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

//Create model
mongoose.model('Deck', deckSchema);

module.exports = deckSchema;
