'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)
import {setDeckEditAction} from '../../../redux-store/actions/decks/actions';
import {DECK_EDIT_DATA} from '../../../redux-store/actions/action-types';

describe('Edit a deck', () => {
    test('Action type SET_LOGINACTION is correct', () => {
        const expected = DECK_EDIT_DATA;
        const result = setDeckEditAction();

        expect(expected).toBe(result.type);
    });

    test('Get deck endpoint', async () => {
        const expectedResult = {
            "name": "Finnish to Dutch prefixes",
            "description": "Learning prefixes ",
            "creatorId": "Joris"
        };
        const response = await fetch(`http://localhost:3001/api/v1/decks/5ddfadab612b09570c6f3a33`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });
        const result = await response.json();

        expect(result.name).toBe(expectedResult.name)
        expect(result.description).toBe(expectedResult.description)
        expect(result.creatorId).toBe(expectedResult.creatorId)
    })
})