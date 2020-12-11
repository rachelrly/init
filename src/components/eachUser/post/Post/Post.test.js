import React from 'react';
import ReactDOM from 'react-dom';
import Post from './Post';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><Post /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})
