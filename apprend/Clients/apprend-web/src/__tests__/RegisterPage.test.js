import React from 'react';
import ReactDOM from 'react-dom';
import {RegisterPageComponent} from '../components/RegisterPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterPageComponent/>, div);
    ReactDOM.unmountComponentAtNode(div);
});