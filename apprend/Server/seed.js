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
            "decks": [
                {
                    "_id": "5ddfadab612b09570c6f3a33",
                    "name": "French to Dutch words",
                    "description": "Prepositions in French",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": []
                },
                {
                    "_id": "5ddfadab612b09570c6f3a33",
                    "name": "Filipino to Dutch words",
                    "description": "Learn Filipino words",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": []
                },
                {
                    "_id": "5ddfadab612b09570c6f3a33",
                    "name": "Finnish to Dutch prefixes",
                    "description": "Learning prefixes ",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Kissa",
                            "answer": "Kat"
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Koira",
                            "answer": "Hond"
                        }
                    ]
                }
            ]
        },
        {
            "_id": "Aaron",
            "email": "aaron@gmail.com",
            "password": "$2a$10$JrWeSo2Y44VI2J8LnKLSwOtPkIyVEP5Y66HJ9cUIR3CX68vjFtPrC",
            "decks": [{
                "name": "English to dutch verbs",
                "description": "My english verbs",
                "creatorId": "Aaron",
                // "creatorId": ,
                // "lastPlayedDate": ,
                "status": "isEdited",
                "flashcards": [
                    {
                        "_id": "Apprende0",
                        "type": "Text only",
                        "question": "Eating",
                        "answer": "Eten"
                    },
                    {
                        "_id": "Apprende1",
                        "type": "Text only",
                        "question": "Walking",
                        "answer": "Lopen"
                    },
                    {
                        "_id": "Apprende2",
                        "type": "Text only",
                        "question": "Running",
                        "answer": "Rennen"
                    },
                ]
            }]
        },
    ])
}
