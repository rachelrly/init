import React from 'react';
import ReactDOM from 'react-dom';
import ProjectUpload from './ProjectUpload';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><ProjectUpload /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})