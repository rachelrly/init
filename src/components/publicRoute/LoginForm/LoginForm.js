import React, { useContext, Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import AuthApiService from '../../../services/auth-api-service'
import UserContext from '../../../contexts/userContext';
import Loading from '../../Loading/Loading';


function LoginForm(props) {
    const userContext = useContext(UserContext);
    const [error, setError] = useState(null);

    const handleSubmit = ev => {
        ev.preventDefault()

        const { username, user_password } = ev.target;

        AuthApiService.postLogin({
            username: username.value,
            user_password: user_password.value,
        })
            .then(res => {
                username.value = ''
                user_password.value = ''
                userContext.processLogin(res.authToken)
                props.onLoginSuccess()
            })
            .catch(res => {
                setError(res.error)
            });
    };

    return (
        <Fragment>
            {userContext.isLoading
                ? <Loading />
                : <form
                    className='LoginForm'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {error &&
                        <p role='alert'
                            className='error-message'
                            aria-live='assertive'>{error}</p>}

                    <div>
                        <label htmlFor='login-username-input'>username</label>
                        <input
                            id='login-username-input'
                            name='username'
                            type='text'
                            required
                            aria-required='true'
                            autoComplete='username'
                        />
                    </div>

                    <div>
                        <label htmlFor='login-password-input'>password</label>
                        <input
                            id='login-password-input'
                            name='user_password'
                            type='password'
                            required
                            aria-required='true'
                            autoComplete='current-password'
                        />
                    </div>
                    <button
                        type='submit'
                        className='form-button'
                    >
                        logIn
                    </button>
                    <Link
                        to='/register'
                    >
                        create an account
                        </Link>

                </form>}
        </Fragment>
    );

};

LoginForm.defaultProps = {
    onLoginSuccess: () => { }
};

export default LoginForm;