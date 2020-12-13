import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InitContentContext from '../../../contexts/initContentContext';
import InitContentApiService from '../../../services/init-content-api-service';
import { buffTo64 } from '../../Utils/Utils';
import { IconContext } from "react-icons";
import '../../../css/Account.css';
import ProfilePic from '../../eachUser/ProfilePic/ProfilePic'

class AccountInformation extends Component {

    /*This component renders the account information for the currently logged-in user
    and links to the component that updates the profile picture*/

    static contextType = InitContentContext;

    state = {
        error: null,
        currentAvatar: {}
    }

    // this componentDidMount keeps the user avatar updated after an update
    componentDidMount() {
        InitContentApiService.getAvatar()
            .then(res => this.setState({ currentAvatar: res }))
            .catch(err => console.error(err))
    }

    renderAvatar() {
        const { currentAvatar } = this.state

        if (!currentAvatar.length) {
            return (
                <ProfilePic />
            );
        } else {
            return (
                <ProfilePic image={`data:image/${currentAvatar[0].img_type};base64,${buffTo64(currentAvatar[0].img_file.data)}`}
                />

            );
        };
    };

    render() {
        const { user } = this.props.user;

        return (
            <IconContext.Provider value={{ color: 'var(--colors-icon-main)', className: "upload-avatar", size: '2em' }}>
                <div className='account-wrapper'>
                    <div className='account-avatar-wrapper'>
                        {this.renderAvatar()}
                        <Link to='/avatarupload'>
                            <button className='upload-avatar-button'>Change avatar</button>
                        </Link>
                    </div>
                </div>

                <div className='account-info-wrapper'>
                    <div>
                        <span className='label'>full name</span>
                        <span>{user.fullname}</span>
                    </div>
                    <div>
                        <span className='label'>username</span>
                        <span>{user.username}</span>
                    </div>
                    <div>
                        <span className='label'>email</span>
                        <span>{user.email}</span>
                    </div>
                    <div>
                        <span className='label'>about</span>
                        <span>{user.about_user}</span>
                    </div>
                </div>
            </IconContext.Provider>
        );
    };
};

export default AccountInformation;