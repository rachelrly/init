import React from 'react';
import defaultImg from '../Footer/Images/avatar-default.png'

function ProfilePic(props) {

    /* This component renders a hexigon filled with an image.
    Please pass this image in as props.image. DEFAULT IMAGE SHOULD NOT BE IN PRODUCTION*/

    return (
        <svg viewBox='0 0 100 100' version='1.1' xmlns='http://www.w3.org/2000/svg' className='profile-pic' >
            <defs>
                <pattern id='img' patternUnits='userSpaceOnUse' width='100' height='100'>
                    <image href={props.image} x="-25" width="150" height='100' />
                </pattern>
            </defs>
            <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)" />
        </svg >
    );
};

ProfilePic.defaultProps = {
    image: defaultImg
};

export default ProfilePic;