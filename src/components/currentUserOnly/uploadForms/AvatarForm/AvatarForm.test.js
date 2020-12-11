import React from 'react';
import ReactDOM from 'react-dom';
import AvatarForm from './AvatarForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><AvatarForm /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})