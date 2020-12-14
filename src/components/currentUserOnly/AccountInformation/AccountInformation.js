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


    render() {
        const { user } = this.props.user;
        const { currentAvatar } = this.state

        return (
            <IconContext.Provider value={{ color: 'var(--colors-icon-main)', className: "upload-avatar", size: '2em' }}>
                <div className='account-wrapper'>
                    <div className='account-avatar-wrapper'>
                        <ProfilePic image={currentAvatar[0] ? `data:image/${currentAvatar[0].img_type};base64,${buffTo64(currentAvatar[0].img_file.data)}` : undefined}
                        />
                        <Link to='/avatarupload'>
                            <button className='upload-avatar-button'>Change avatar</button>
                        </Link>
                    </div>

                    <p>fullname: {user.fullname}</p>

                    <p>email: {user.email}</p>

                    <p>about: {user.about_user}</p>

                </div>


            </IconContext.Provider>
        );
    };
};

export default AccountInformation;