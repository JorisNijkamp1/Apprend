import React from 'react';
import ReactDOM from 'react-dom';
import {RegisterPageComponent, usernameValid} from '../../../components/register/RegisterPage';

test('Component renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterPageComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('Username should be valid', () => {
    const expected = true;
    const username = 'Johndoe125';
    const result = usernameValid();
});

test('Username should not be valid', () => {

});

test('Email should be valid', () => {

});

test('Email should not be valid', () => {

});

test('Password should be valid', () => {

});

test('Repeat password is same as password', () => {

});

test('Repeat password is not same as password', () => {

});