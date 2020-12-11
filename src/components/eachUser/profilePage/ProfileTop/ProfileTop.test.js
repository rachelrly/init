import React from 'react';
import ReactDOM from 'react-dom';
import ProfileTop from './ProfileTop';

it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<ProfileTop />, div);

    ReactDOM.unmountComponentAtNode(div);
});