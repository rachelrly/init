import React from 'react';
import defaultImg from '../Footer/Images/avatar-default.png'

function ProfilePic(props) {
    const imageId = 'img-' + props.index

    return (
        <svg viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg' className={props.className ? `profile-pic ${props.className}` : 'profile-pic'}>
            <defs>
                <pattern id={imageId} patternUnits='userSpaceOnUse' width='100' height='100'>
                    <image href={props.image} x="-25" width="150" height='100' />
                </pattern>
            </defs>
            <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill={`url(#${imageId})`} />
        </svg >
    );
};

ProfilePic.defaultProps = {
    image: defaultImg
};

export default ProfilePic;