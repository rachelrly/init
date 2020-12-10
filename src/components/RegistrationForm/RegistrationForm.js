import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/userContext';

class RegistrationForm extends Component {

    /*This component handles registration of a new user*/

    static defaultProps = {
        onRegistrationSuccess: () => { }
    };

    static contextType = UserContext;

    state = {
        error: null,
    };

    firstInput = React.createRef();

    handleSubmit = ev => {
        ev.preventDefault();

        const {
            fullname,
            username,
            user_password,
            user_password_match,
            email
        } = ev.target;
        console.log(ev.target)

        if (user_password.value !== user_password_match.value) {
            this.setState({ error: 'Passwords must match' });
            return;
        } else {
            this.setState({ error: null });
            AuthApiService.postUser({
                fullname: fullname.value,
                username: username.value,
                user_password: user_password.value,
                email: email.value,
                about_user: 'about user',
                user_stack: 'Full Stack'
            })
                .then(req => console.log(req))
                .then(user => {
                    fullname.value = ''
                    username.value = ''
                    user_password.value = ''
                    user_password_match.value = ''
                    email.value = ''
                    this.props.onRegistrationSuccess()
                })
                .catch(res => {
                    this.setState({ error: res.error })
                })
        };
    };

    componentDidMount() {
        this.firstInput.current.focus();
    };

    render() {
        const { error } = this.state;
        return (
            <form
                className='registration-form'
                onSubmit={(e) => this.handleSubmit(e)}
            >
                {error && <p role='alert'
                    className='error-message'
                    aria-live='assertive'>{error}</p>}
                <div>

                    <label htmlFor='registration-fullname-input'>full name</label>
                    <input
                        ref={this.firstInput}
                        id='registration-fullname-input'
                        type='text'
                        name='fullname'
                        required
                        aria-required='true'
                        autoComplete='name'
                    />
                </div>

                <div>

                    <label htmlFor='registration-username-input'>username</label>
                    <input
                        id='registration-username-input'
                        name='username'
                        required
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>
                <div>

                    <label htmlFor='registration-password-input'>password</label>
                    <input
                        id='registration-password-input'
                        name='user_password'
                        type='password'
                        required
                        aria-required='true'
                        autoComplete='new-password'
                    />
                </div>
                <div>
                    <label htmlFor='registration-password-match-input'>match password
                        </label>


                    <input
                        id='registration-password-match-input'
                        name='user_password_match'
                        type='password'
                        required
                        aria-required='true'
                        autoComplete='off'
                    />
                </div>

                <div>
                    <label htmlFor='registration-email-input'>email</label>
                    <input
                        id='registration-email-input'
                        name='email'
                        type='email'
                        required
                        aria-required='true'
                        autoComplete='email'
                    />
                </div>
                <button
                    type='submit'
                    className='form-button'
                >
                    signup
                    </button>

                <Link
                    to='/login'
                >
                    already have an account?
                        </Link>


            </form>
        );
    };
};

export default RegistrationForm;