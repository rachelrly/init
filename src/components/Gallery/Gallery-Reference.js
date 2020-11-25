import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
// import AvatarDefault from '../Footer/Images/avatar-default.png'
import { buffTo64 } from '../Utils/Utils'

import '../../css/AccountInformation.css'

class GalleryReference extends Component {
    static contextType = InitContentContext

    state = {
        error: null,
        projects: {},
    }

    // this componentDidMount keeps the user avatar updated after an update
    componentDidMount() {
        // this.context.clearError()
        console.log('gettingPosts')
        InitContentApiService.getUserProjects()
            // .then(res => this.setState({ projects: res }))
            // .catch(this.setState)
            .then(res => console.log('Posts received', res))
    }

    renderProjects() {
        const { projects } = this.state

        if (!projects.length) {
            return (
                // <img 
                //     className='circular-landscape'
                //     src={AvatarDefault} 
                //     alt='avatar-default-logo'
                // />
                <span>''</span>
            )
        } else {
            return (
                <div className='gallery'>
                    {projects.map(project => (
                        <div key={project.id} className='img-container'>                        
                            <img
                                className='gallery-img'
                                alt={`project ${project.post_title}`}
                                src={`data:image/${project.post_image_type};base64,${buffTo64(project.post_image_file.data)}`}
                            />
                        </div>
                    ))}
                </div>
            )
        }
    }

    render() {
        // const { user } = this.props.user

        return (
            <div>
                {/* <div className='account-avatar-wrapper'> */}
                    {this.renderProjects()}
                    {/* <div className='update-avatar-link'>
                        <Link 
                            to='/avatarupload'
                        >
                            Update Avatar
                        </Link>
                    </div> */}
                {/* </div> */}
                {/* <form className='account-form'>
                    <fieldset>
                        <legend><h3>fullName</h3></legend>
                        <span>{ user.fullname }</span>
                    </fieldset>
                    <fieldset>
                        <legend><h3>userName</h3></legend>
                        <span>{ user.username }</span>
                    </fieldset>
                    <fieldset>
                        <legend><h3>eMail</h3></legend>
                        <span>{ user.email }</span>
                    </fieldset>
                    <fieldset>
                        <legend><h3>about</h3></legend>
                        <span>{ user.about_user }</span>
                    </fieldset>
                    <fieldset>
                        <legend><h3>stack</h3></legend>
                        <span>{ user.user_stack }</span>
                    </fieldset>
                </form> */}
            </div>
        );
    }
};

export default GalleryReference;