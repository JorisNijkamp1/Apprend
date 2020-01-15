/**
 * @jest-environment node
 */
'use strict';
const mongoose = require('mongoose')
const U = require('../../../../../../Server/database/models/user')
const User = mongoose.model('User', U)
import {setDeckEditAction} from '../../../components/shared/actions/actions';
import {DECK_EDIT_DATA} from '../../../redux-config/actionTypes';

describe('Edit a deck', () => {
    test('Action type SET_LOGINACTION is correct', () => {
        const expected = DECK_EDIT_DATA;
        const result = setDeckEditAction();

        expect(expected).toBe(result.type);
    });

})
