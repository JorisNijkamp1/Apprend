const mongoose = require('mongoose');
const Deck = require('./deck');

//Create schema
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    decks: {
        type: [{type: Deck}],
    },
    signupDate: {
        type: Date, default: Date.now
    }
});

userSchema.methods.addDeck = async function (deck) {
    this.decks.push(deck)
    this.markModified('decks')
    await this.save()
    return this.decks[this.decks.length - 1]
}

userSchema.methods.editDeckname = async function (deckId, name, description) {
    this.decks = this.decks.map(deck => {
        if (deck._id.toString() === deckId) {
            deck.name = name
            deck.description = description
        }
        return deck
    })
    this.markModified('decks')
    await this.save();
    return this
}

userSchema.methods.editFlashcardBoxSessionPlayed = async function (deckId, flashcardId, answeredCorrect) {
    this.decks = this.decks.map(deck => {
        if (deck._id.toString() === deckId) {
            deck.editFlashcardBoxSessionPlayed(flashcardId, answeredCorrect, deck.session);
        }

        return deck;
    });

    this.markModified('decks');
    await this.save();
    return this.decks.find(deck => deck._id.toString() === deckId);
};

userSchema.methods.editDeckSession = async function (deckId, session) {
    this.decks = this.decks.map(deck => {
        if (deck._id.toString() === deckId) {
            deck.session = session;
        }

        return deck;
    });

    this.markModified('decks');
    await this.save();
    return this.decks.find(deck => deck._id.toString() === deckId);
};

userSchema.methods.deleteDeck = async function (deckId) {
    this.decks = this.decks.filter(deck => {
        console.log(deck._id, deckId)
        return deck._id.toString() !== deckId
    })
    this.markModified('decks')
    await this.save()
    return this
}

//Create model
mongoose.model('User', userSchema);

module.exports = userSchema;
// module.exports = mongoose.model('User', userSchema)
