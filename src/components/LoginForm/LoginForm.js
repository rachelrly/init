import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/userContext'
import '../../css/AccountInformation.css'


class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => { }
    }

    static contextType = UserContext

    state = { error: null }

    firstInput = React.createRef()

    handleSubmit = ev => {
        ev.preventDefault()

        const { username, user_password } = ev.target

        this.setState({ error: null })

        AuthApiService.postLogin({
            username: username.value,
            user_password: user_password.value,
        })
            .then(res => {
                username.value = ''
                user_password.value = ''
                this.context.processLogin(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error.message })
            })
    }

    componentDidMount() {
        this.firstInput.current.focus()
    }

    render() {
        const { error } = this.state
        return (
            <form
                className='LoginForm'
                onSubmit={this.handleSubmit}
            >
                <div
                    role='alert'
                    className='error-message'
                    aria-live='assertive'
                >
                    {error && <p>{error}</p>}
                </div>
                <div className='form-wrapper'>
                    <fieldset>
                        <legend><h3>userName</h3></legend>
                        <label htmlFor='login-username-input'></label>
                        <input
                            ref={this.firstInput}
                            id='login-username-input'
                            name='username'
                            type='text'
                            required
                            aria-required='true'
                            autoComplete='username'
                        />
                    </fieldset>
                </div>
                <div className='form-wrapper'>
                    <fieldset>
                        <legend><h3>passWord</h3></legend>
                        <label htmlFor='login-password-input'></label>
                        <input
                            id='login-password-input'
                            name='user_password'
                            type='password'
                            required
                            aria-required='true'
                            autoComplete='current-password'
                        />
                    </fieldset>
                </div>
                <div>
                    <button
                        type='submit'
                        className='form-button'
                    >
                        logIn
                    </button>
                </div>
            </form>
        )
    }
}

export default LoginForm