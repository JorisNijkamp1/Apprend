const mongoose = require('mongoose');
const Deck = require('./deck');
const DeckModel = mongoose.model('Deck');

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
    },
    profileAvatar: {
        type: String
    }
});

userSchema.methods.addDeck = async function (deck) {
    this.decks.push(deck)
    this.markModified('decks')
    await this.save()
    return this.decks[this.decks.length - 1]
}

userSchema.methods.editDeckname = async function (deckId, name, description, tags) {
    this.decks = this.decks.map(deck => {
        if (deck._id.toString() === deckId) {
            deck.name = name
            deck.description = description
            deck.tags = tags
        }
        return deck
    })
    this.markModified('decks')
    await this.save();
    return this
}

userSchema.methods.editFlashcardLeitner = async function (deckId, flashcardId, answeredCorrect) {
    this.decks = this.decks.map(deck => {
        if (deck._id.toString() === deckId) {
            deck.editFlashcardLeitner(flashcardId, answeredCorrect, deck.session);
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
        return deck._id.toString() !== deckId
    })
    this.markModified('decks')
    await this.save()
    return this

}

userSchema.methods.importDeck = async function (deck, user) {
    delete deck.games;
    this.decks.push(deck)
    this.markModified('decks')
    await this.save()
    return this
}

userSchema.methods.convertDecks = async function (oldUsername, oldDecks) {
    let newDecks = [];

    for (let i = 0; i < oldDecks.length; i++) {
        const newCreatorId = (oldUsername === oldDecks[i].creatorId) ? this._id : oldDecks[i].creatorId;

        newDecks.push(
            new DeckModel({
                'name': oldDecks[i].name,
                'description': oldDecks[i].description,
                'creatorId': newCreatorId,
                'creationDate': oldDecks[i].creationDate,
                'lastPlayedDate': oldDecks[i].lastPlayedDate,
                'status': oldDecks[i].status,
                'flashcards': oldDecks[i].flashcards,
                'private': oldDecks[i].private
            })
        );
    }

    this.decks = newDecks;
    await this.save();
};

//Create model
mongoose.model('User', userSchema);

module.exports = userSchema;
// module.exports = mongoose.model('User', userSchema)
