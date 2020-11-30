import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    const props = {
        date_created: new Date()
    }

    ReactDOM.render(
        <BrowserRouter>
            <Comment date_created={props.date_created} />
        </BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})