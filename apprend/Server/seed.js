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
                    "name": "1",
                    "description": "Prepositions in French",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": []
                },
                {
                    "name": "2",
                    "description": "Learn Filipino words",
                    "creatorId": "Joris",
                    // "creatorId": ,
                    // "lastPlayedDate": ,
                    "status": "isEdited",
                    "flashcards": []
                },
                {
                    "name": "3",
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
            "decks": [
                {
                    "name": "4",
                    "description": "My english verbs",
                    "creatorId": "Aaron",
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
                },
                {
                    "name": "5",
                    "description": "Lorem ipsum dolar sint description deck",
                    "creatorId": "Aaron",
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
                },
                {
                    "name": "6",
                    "description": "Dolar English deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
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
                },
                {
                    "name": "7",
                    "description": "Special deck for learning Spanish",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen"
                        }
                    ]
                },
                {
                    "name": "8",
                    "description": "Type of Dolphins",
                    "creatorId": "Aaron",
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
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen"
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
                },
                {
                    "name": "9",
                    "description": "Weekend fun",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
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
                },
                {
                    "name": "10",
                    "description": "My lovely SouthPark Seasons",
                    "creatorId": "Aaron",
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
                },
                {
                    "name": "11",
                    "description": "Learning Dutch and French",
                    "creatorId": "Aaron",
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
                },
                {
                    "name": "12",
                    "description": "For Trump fans",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende1",
                            "type": "Text only",
                            "question": "Twitter",
                            "answer": "Love"
                        },
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen"
                        },
                    ]
                },
                {
                    "name": "13",
                    "description": "Special deck for learning French",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen"
                        }
                    ]
                },
                {
                    "name": "14",
                    "description": "Lorem ilar sint description deck",
                    "creatorId": "Aaron",
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
                        {
                            "_id": "Apprende2",
                            "type": "Text only",
                            "question": "Running",
                            "answer": "Rennen"
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
                },
                {
                    "name": "15",
                    "description": "Dolar English deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
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
                },
                {
                    "name": "16",
                    "description": "Dolar English deck",
                    "creatorId": "Aaron",
                    "status": "isEdited",
                    "flashcards": [
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
                }

            ]
        },
    ])
}
