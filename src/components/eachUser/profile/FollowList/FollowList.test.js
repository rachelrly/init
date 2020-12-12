import React from 'react';
import ReactDOM from 'react-dom';
import FollowList from './FollowList';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><FollowList /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})