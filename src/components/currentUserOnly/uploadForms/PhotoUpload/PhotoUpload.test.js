import React from 'react';
import ReactDOM from 'react-dom';
import PhotoUpload from './PhotoUpload';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><PhotoUpload /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})