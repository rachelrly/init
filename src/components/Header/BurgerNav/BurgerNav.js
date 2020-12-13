import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../../services/token-service';
import UserContext from '../../../contexts/userContext';


function BurgerNav() {

    const userContext = useContext(UserContext);

    const [showNav, setShowNav] = useState(true);
    
    return (
        <div className='burger-and-nav' >
            {
                showNav
                    ? <div
                        onClick={() => setShowNav(!showNav)}
                        onKeyDown={e => e.key === 'Enter' ? setShowNav(!showNav) : null}
                        className='burger-wrapper'
                        tabIndex='0'
                        role='button' 
                        aria-label='navigation-menu-clickable' 
                        aria-expanded='false'>

                        <span className='burger-line burger-line-one'></span>
                        <span className='burger-line burger-line-two'></span>
                        <span className='burger-line burger-line-three'></span>
                    </div >

                    : <Fragment>
                        <div
                            onClick={() => setShowNav(!showNav)}
                            onKeyDown={e => e.key === 'Enter' ? setShowNav(!showNav) : null}
                            className='burger-wrapper'
                            tabIndex='0'
                            role='button'
                            aria-label='navigation-menu-clickable'
                            aria-expanded='true'>

                            <span className='burger-line burger-line-one burger-line-open-one'></span>
                            <span className='burger-line burger-line-two burger-line-open-two'></span>
                            <span className='burger-line burger-line-three burger-line-open-three'></span>
                        </div>

                        <nav
                            role='navigation'
                            className='navigation'
                            aria-live='assertive'
                            aria-relevant='all'>

                            {TokenService.hasAuthToken()
                                ? <Fragment>
                                    < div className='navigation-item nav-item-one' onClick={() => setShowNav(true)}>
                                        <Link to='/feed' className='navigation-link'>
                                            feed
                            </Link>
                                    </div>
                                    < span className='navigation-item nav-item-two' onClick={() => setShowNav(true)}>
                                        <Link to='/portfolio' className='navigation-link'>
                                            profile
                            </Link>
                                    </span>
                                    <span className='navigation-item nav-item-three' onClick={() => setShowNav(true)}>
                                        <Link to='/users' className='navigation-link'>
                                            users
                            </Link>
                                    </span>
                                    <span className='navigation-item nav-item-four' onClick={() => setShowNav(true)}>
                                        <Link to='/account' className='navigation-link'>
                                            account
                            </Link>
                                    </span>
                                    
                                    <span
                                        className='navigation-item  nav-item-five nav-logout-button'
                                        onClick={() => {
                                            userContext.processLogout()
                                            setShowNav(true)
                                        }}>
                                       
                                            log out
                                      
                                    </span>
                                </Fragment>
                                : <Fragment>
                                    < span className='navigation-item nav-item-one' onClick={() => setShowNav(true)}>
                                        <Link to='/login' className='navigation-link'>
                                            logIn
                                    </Link>
                                    </span>
                                    <span className='navigation-item nav-item-two' onClick={() => setShowNav(true)}>
                                        <Link to='/register' className='navigation-link'>
                                            signUp
                                    </Link>
                                    </span>
                                </Fragment>
                            }

                        </nav>
                    </Fragment>
            }

        </div >
    );
};

export default BurgerNav




