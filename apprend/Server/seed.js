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
                    "name": "French to Dutch words",
                    "description": "Prepositions in French",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": []
                },
                {
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
                            "answer": "Kat",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Koira",
                            "answer": "Hond",
                            "sessionPlayed": 0,
                            "box": 0
                        }
                    ],
                    "tags": [
                        "test"
                    ]
                }
            ]
        },
        {
            "_id": "Aaron",
            "email": "aaron@gmail.com",
            "password": "$2a$10$JrWeSo2Y44VI2J8LnKLSwOtPkIyVEP5Y66HJ9cUIR3CX68vjFtPrC",
            "decks": [
                {
                    "_id": "5ddfadab612b09570c6f3a34",
                    "name": "English to dutch verbs",
                    "description": "My english verbs",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "Lorem ipsum dolar",
                    "description": "Lorem ipsum dolar sint description deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende4",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende5",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "Sint dolar English",
                    "description": "Dolar English deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "English to Spanish verbs",
                    "description": "Special deck for learning Spanish",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        }
                    ]
                },
                {
                    "name": "Dolphin types",
                    "description": "Type of Dolphins",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "Talking with animals",
                    "description": "Weekend fun",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "South Park seasons",
                    "description": "My lovely SouthPark Seasons",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "French to Dutch",
                    "description": "Learning Dutch and French",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "Tweets by Trump",
                    "description": "For Trump fans",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Twitter",
                            "answer": "Love",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "French to Spanish verbs",
                    "description": "Special deck for learning French",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        }
                    ]
                },
                {
                    "name": "Spanish to French",
                    "description": "Lorem ilar sint description deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende0",
                            "type": "Text only",
                            "question": "Eating",
                            "answer": "Eten",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "English Words",
                    "description": "Dolar English deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Walking",
                            "answer": "Lopen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                    ]
                },
                {
                    "name": "Japans",
                    "description": "Lekker nice Japans",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "犬",
                            "answer": "Hond",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "猫",
                            "answer": "Kat",
                            "sessionPlayed": 0,
                            "box": 0
                        },
                        {
                            "_id": "Apprende3",
                            "type": "Text only",
                            "question": "家",
                            "answer": "Huis",
                            "sessionPlayed": 0,
                            "box": 0
                        }
                    ]
                }
            ]
        },
    ])
}
