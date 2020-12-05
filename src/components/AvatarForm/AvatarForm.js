import React, { Component } from 'react';
import InitContentContext from '../../contexts/initContentContext';
import InitContentApiService from '../../services/init-content-api-service';
import PhotoUpload from '../PhotoUpload/PhotoUpload';
import '../../css/AvatarForm.css';


class AvatarForm extends Component {

    /*Allows users to update their profile picture from the about page*/

    static contextType = InitContentContext;

    state = {
        error: null,
        currentAvatar: {},
    };

    /*this component did mount sets the state of currentAvatar, allowing us 
    to run a check for avatar uploads: if one exists, the client makes a 
    patch request for the existing avatar.  If it doesn't, the client makes 
    a post request. */

    componentDidMount() {
        InitContentApiService.getAvatar()
            .then(res => this.setState({ currentAvatar: res }));
    };

    handleSubmit = (ev) => {
        ev.preventDefault();
        const currentAvatar = this.state.currentAvatar;
        const { setData } = this.context;


        if (!currentAvatar.length) {
            InitContentApiService.postAvatar(ev.target)
                .then(() => this.props.history.push('/account'))
                .then(setData())
                .catch(error => {
                    this.setState({ error })
                });

        } else {
            InitContentApiService.updateAvatar(ev.target, currentAvatar[0].id)
                .then(() => this.props.history.push('/account'))
                .then(setData())
                .catch(error => {
                    this.setState({ error })
                });
        };
    };

    render() {
        const { error } = this.state;
        const { data } = this.context;
        const currentAvatar = this.state.currentAvatar;

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
                <div>
                    <PhotoUpload />
                </div>
                <button
                    type='submit'
                    className='avatar-form-submit-button'
                    disabled={!data}
                >
                    Upload Avatar
                </button>
            </form>
        );
    };
};

export default AvatarForm;