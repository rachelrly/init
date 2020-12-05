import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BurgerNav from '../BurgerNav/BurgerNav.js';
import UserContext from '../../contexts/userContext';
import addLogo from '../../Images/add-logo.png';
import '../../css/Header.css';
import TokenService from '../../services/token-service';


function Header() {
    const userContext = useContext(UserContext);

    return (
        <header>
            {TokenService.hasAuthToken()
                ? <Link to='/feed'><h1>{userContext.user.username}</h1></Link>
                : <Link to='/'><h1>init</h1></Link>}
            <div className='header-icons'>
                <Link to='/newProject' className='add-logo-focus'>
                    <img className='add-logo'
                        src={addLogo}
                        alt='add new post' />
                </Link>
                <BurgerNav />
            </div>
        </header>
    )
}

export default Header;
