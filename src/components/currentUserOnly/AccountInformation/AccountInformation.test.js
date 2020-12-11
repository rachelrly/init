import React from 'react';
import ReactDOM from 'react-dom';
import AccountInformation from './AccountInformation';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><AccountInformation user={{user: {id: 1, fullname: 'fullname', username: 'username'}}} /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})