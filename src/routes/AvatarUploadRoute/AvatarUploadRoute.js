import React, { Component } from 'react';
import AvatarForm from '../../components/AvatarForm/AvatarForm'


class AvatarUploadRoute extends Component {
    render() {
        return (
            <div className='avatar-upload-wrapper'>
                <AvatarForm
                    history={this.props.history}
                />
            </div>
        );
    };
};

export default AvatarUploadRoute;