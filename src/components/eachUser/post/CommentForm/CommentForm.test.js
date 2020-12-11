import React from 'react';
import ReactDOM from 'react-dom';
import CommentForm from './CommentForm';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(
        <BrowserRouter>
            <CommentForm />
        </BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})