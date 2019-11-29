const mongoose = require('mongoose');
require('./database/models/user');
require('./database/models/deck');
const db = mongoose.connection;
const Users = mongoose.model('User');
const dbConfig = require('./config');

//First code line is for Localhost
mongoose.connect(`mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
// mongoose.connect(`mongodb+srv://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.HOST}/${dbConfig.DB}?retryWrites=true&w=majority`, {
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
            "password": "$2a$10$jAeV7PFZ4REdverFjPiDx.3ZNd7tdqdx1VRQ/2ZqQQxL1y.TRE5Gq",
            "decks": [{
                "_id": "5ddfadab612b09570c6f3a33",
                "name": "Frans woordjes",
                "description": "Mooie lijst met 50 woordjes frans erg gaaf!",
                "creatorId": "Joris",
                // "creatorId": ,
                // "lastPlayedDate": ,
                "status": "isEdited",
                "flashcards": []
            }]
        },
        {
            "_id": "Aaron",
            "email": "aaron@gmail.com",
            "password": "$2a$10$JrWeSo2Y44VI2J8LnKLSwOtPkIyVEP5Y66HJ9cUIR3CX68vjFtPrC",
            "decks": [{
                "name": "Engels woordjes",
                "description": "english",
                "creatorId": "Aaron",
                // "creatorId": ,
                // "lastPlayedDate": ,
                "status": "isEdited",
                "flashcards": [
                    {
                        "_id": "Apprende",
                        "type": "Text only",
                        "question": "Hello"
                    },
                    {
                        "_id": "Apprende1",
                        "type": "Text only",
                        "question": "Hello1"
                    },
                    {
                        "_id": "Apprende2",
                        "type": "Text only",
                        "question": "Hello2"
                    },
                ]
            }]
        },
    ])
}
