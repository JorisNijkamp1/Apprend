const mongoose = require('mongoose');
require('./database/models/user');
require('./database/models/deck');
const db = mongoose.connection;
const Users = mongoose.model('User');
const Decks = mongoose.model('Deck');
const dbConfig = require('./config');

//First code line is for Localhost
// mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection success");
    return seedUsers();
}).catch(err => {
    console.log(err);
}).then(() => {
    db.close();
});

async function seedUsers() {
    await Users.deleteMany();

    await Users.insertMany([
        {
            "_id": "Joris",
            "email": "jorisnijkamp@gmail.com",
            "password": "han",
            "decks": [{
                "name": "Frans woordjes",
                "description": "Mooie lijst met 50 woordjes frans erg gaaf!",
                "creatorId": "Joris",
                // "creatorId": ,
                // "lastPlayedDate": ,
                "status": "isEdited",
                "flashcards": [{
                    "_id": "Apprende",
                    "type": "Text only",
                    "question": "Hello"
                }]
            }]
        },
        {
            "_id": "Aaron",
            "email": "aaron@gmail.com",
            "password": "ica",
        },
    ])
}
