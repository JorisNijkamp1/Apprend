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
    }
});

userSchema.methods.addDeck = async function(deck){
    this.decks.push(deck)
    this.markModified('decks')
    await this.save()
    return this.decks[this.decks.length-1]
}
//Create model
mongoose.model("User", userSchema);

// module.exports = userSchema;
module.exports = mongoose.model('User', userSchema)
