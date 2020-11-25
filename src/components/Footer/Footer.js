import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import LockedHive from './Images/login-logo.png';
import HiveFeed from './Images/feed-logo.png';
import Swarm from './Images/connect-logo.png';
import Buzz from './Images/notification-logo.png';
import Account from './Images/default-profile-logo.png';
import UserContext from '../../contexts/userContext'


export default class Footer extends Component {
    static contextType = UserContext;

    renderFooterLoggedIn() {
        return (
            <div>
                <ul className='Footer'>
                    <li><Link
                        to='/feed'
                        className='navItem'
                    >
                        <img src={HiveFeed} alt='Feed link logo' className='navIcon' alt='hive'></img>
                    </Link></li>
                    <li><Link
                        to='/connections'
                        className='navItem'
                    >
                        <img src={Swarm} alt='connections link logo' className='navIcon' alt='swarm'></img>
                    </Link></li>
                    <li><Link
                        to='/buzz'
                        className='navItem'
                    >
                        <img src={Buzz} alt='Buzz link logo' className='navIcon' alt='buzz'></img>
                    </Link></li>
                    <li><Link
                        to='/Portfolio'
                        className='navItem'
                    >
                        <img src={Account} alt='Account link logo' className='navIcon' alt='queenBee'></img>
                    </Link></li>
                </ul>
            </div>
        );
    }

    renderFooterLoggedOut() {
        return (
            <div>
                <ul className='Footer'>
                    <li>
                        <Link
                            to='/login'
                            className='navItem'
                        >
                            <img src={LockedHive} alt='Feed link logo' className='navIcon' alt='logIn'></img>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

    render() {
        const { isLoggedIn } = this.context;

        return (
            <div className='FooterWrapper'>
                {isLoggedIn
                    ? this.renderFooterLoggedIn()
                    : this.renderFooterLoggedOut()}
            </div>
        );
    }

}