import React from 'react';
import ReactDOM from 'react-dom';
import Yo from './Yo';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<Yo />, div);

    ReactDOM.unmountComponentAtNode(div);
})