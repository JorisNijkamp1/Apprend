const mongoose = require('mongoose');
require('./database/models/deck');
require('./database/models/flashcard');
require('./database/models/user');
const db = mongoose.connection;
const Deck = require('./database/models/deck');
const Flashcard = require('./database/models/flashcard');
const User = require('./database/models/user');
const dbConfig = require('./config');

//First code line is for Localhost
// mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection success")
    return seedUsers();
}).catch(err => {
    console.log(err);
}).then(() => {
    db.close();
});

async function seedUsers() {
    await User.deleteMany();

    await User.insertMany([
        {
            "username": "Joris",
            "email": "jorisnijkamp@gmail.com",
            "password": "han",
        },
        {
            "username": "Aaron",
            "email": "aaron@gmail.com",
            "password": "ica",
        },
    ])
}