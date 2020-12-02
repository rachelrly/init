import React, { Component } from 'react'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
import PhotoUpload from '../PhotoUpload/PhotoUpload'
import '../../css/AvatarForm.css'


class AvatarForm extends Component {
    static contextType = InitContentContext

    state = {
        error: null,
        currentAvatar: {},
    }

    // this component did mount sets the state of currentAvatar, allowing us 
    // to run a check for avatar uploads: if one exists, the client makes a 
    // patch request for the existing avatar.  If it doesn't, the client makes 
    // a post request. 
    componentDidMount() {
        // this.context.clearError()
        InitContentApiService.getAvatar()
            .then(res => this.setState({ currentAvatar: res }))
        // .catch(this.setState)
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const currentAvatar = this.state.currentAvatar
        const { setData } = this.context


        if (!currentAvatar.length) {
            InitContentApiService.postAvatar(ev.target)
                // .then(setCurrentAvatar())
                .then(() => this.props.history.push('/account'))
                .then(setData())
                .catch(error => {
                    this.setState({ error })
                })
        } else {
            InitContentApiService.updateAvatar(ev.target, currentAvatar[0].id)
                // .then(setCurrentAvatar())
                .then(() => this.props.history.push('/account'))
                .then(setData())
                .catch(error => {
                    this.setState({ error })
                })
        }
    }

    render() {
        const { error } = this.state
        const { data } = this.context
        const currentAvatar = this.state.currentAvatar
        console.log('avatar', currentAvatar)

        return (
            <form
                className='avatar-form'
                onSubmit={this.handleSubmit}
                encType='multipart/form-data'
            >
                <div
                    role='alert'
                    className='error-message'
                    aria-live='assertive'
                >
                    {error && <p>{error.message}</p>}
                </div>
                <PhotoUpload />
                <div className='avatar-form-input'>
                    {/* <label 
                        htmlFor='avatar-image-name-input'
                        aria-label='avatar-image-name-input'
                        className='avatar-form-label'
                    />
                    <input
                        id='avatar-image-name-input'
                        name='avatar-image-name-input'
                        type='text'
                        className='avatar-form-input'
                        placeholder='Enter a name for your image'
                        aria-required='false'
                        autoComplete='off'
                    >
                    </input> */}
                </div>
                <button
                    type='submit'
                    className='avatar-form-submit-button'
                    disabled={!data}
                >
                    Upload Avatar
                </button>
            </form>
        )
    }
}

export default AvatarForm