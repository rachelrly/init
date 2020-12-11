import React from 'react';
import ReactDOM from 'react-dom';
import BurgerNav from './BurgerNav';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<BrowserRouter><BurgerNav /></BrowserRouter>, div);

    ReactDOM.unmountComponentAtNode(div);
})