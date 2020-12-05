import React, { Fragment } from 'react';
import logo from '../../Images/logo.png';

function Yo() {
    /*This component renders the logo and the about page*/
    return (
        <Fragment>
            <img className='main-logo' src={logo} alt='a bee landing on a honeycomb' />
        </Fragment>

    );
};

export default Yo;
