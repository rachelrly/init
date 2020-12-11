import React, { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/userContext';
import HiveFeed from '../../Images/feed-logo.png';
import Swarm from '../../Images/connect-logo.png';
import Buzz from '../../Images/notification-logo.png';
import Account from '../../Images/default-profile-logo.png';

function BurgerNav() {

    const userContext = useContext(UserContext);

    const [showNav, setShowNav] = useState(true);
    
    // <img src={HiveFeed} alt='Feed link logo' className='navIcon'/>
    // <img src={Buzz} alt='Buzz link logo' className='navIcon'/>
    
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
                            </Link><img src={Swarm} alt='Connections link logo' className='navIcon'/>
                                    </div>
                                    
                                    < span className='navigation-item nav-item-two' onClick={() => setShowNav(true)}>
                                        <Link to='/connections' className='navigation-link'>
                                            connections
                            </Link>
                                    </span>
                                    < span className='navigation-item nav-item-three' onClick={() => setShowNav(true)}>
                                        <Link to='/portfolio' className='navigation-link'>
                                            profile
                            </Link>
                                    </span>
                                    <span className='navigation-item nav-item-four' onClick={() => setShowNav(true)}>
                                        <Link to='/users' className='navigation-link'>
                                            users
                            </Link>
                                    </span>
                                    <span className='navigation-item nav-item-five' onClick={() => setShowNav(true)}>
                                        <Link to='/account' className='navigation-link'>
                                            account
                            </Link>
                                    </span>
                                    
                                    <span
                                        className='navigation-item  nav-item-six nav-logout-button'
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




