import React from 'react';
import ReactDOM from 'react-dom';
import PostForm from './PostForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><PostForm /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})