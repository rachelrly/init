import React, { Component } from 'react'
import InitContentContext from '../../contexts/initContentContext'
import InitContentApiService from '../../services/init-content-api-service'
import ProjectUpload from '../ProjectUpload/ProjectUpload'
import '../../css/PhotoUpload.css'


class PostForm extends Component {
    static contextType = InitContentContext

    state = {
        error: null,
        // currentAvatar: {},
    }

    // this component did mount sets the state of currentAvatar, allowing us 
    // to run a check for avatar uploads: if one exists, the client makes a 
    // patch request for the existing avatar.  If it doesn't, the client makes 
    // a post request. 
    // componentDidMount() {
    //     // this.context.clearError()
    //     InitContentApiService.getAvatar()
    //         .then(res => this.setState({ currentAvatar: res }))
    //         // .catch(this.setState)
    // }

    handleSubmit = (ev) => {
        ev.preventDefault()
        // const currentPost= this.state.currentAvatar
        const { setProjectData } = this.context

        console.log('this ran')
        InitContentApiService.postInitProject(ev.target)
            // .then(setCurrentAvatar())
            .then(() => this.props.history.push('/portfolio'))
            .then(setProjectData())
            .catch(error => {
                this.setState({ error })
            })
    }


    render() {
        const { error } = this.state
        const { projectData } = this.context
        // const currentAvatar = this.state.currentAvatar
        // console.log('avatar', currentAvatar)

        return (
            <form
                className='project-form'
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
                <ProjectUpload />
                <div className='post-input-wrapper'>
                    <fieldset>
                        <legend><h3>title</h3></legend>
                        <label
                            htmlFor='init-project-title-input'
                            aria-label='init-project-title-input'
                            className='project-form-label'
                        />
                        <input
                            id='init-project-title-input'
                            name='post_title'
                            type='text'
                            className='project-form-input'
                            placeholder='projectTitle'
                            aria-required='true'
                            autoComplete='off'
                        />
                    </fieldset>
                    <fieldset>
                        <legend><h3>specs</h3></legend>
                        <label
                            htmlFor='init-project-description-input'
                            aria-label='init-project-description-input'
                            className='project-form-label'
                        />
                        <input
                            id='init-project-description-input'
                            name='post_description'
                            type='text'
                            className='project-form-input'
                            placeholder='projectSpecs'
                            aria-required='true'
                            autoComplete='off'
                        />
                    </fieldset>
                    <fieldset>
                        <legend><h3>liveURL</h3></legend>
                        <label
                            htmlFor='init-project-live-link-input'
                            aria-label='init-project-live-link-input'
                            className='project-form-label'
                        />
                        <input
                            id='init-project-live-link-input'
                            name='post_live_link'
                            type='text'
                            className='project-form-input'
                            placeholder='projectClient'
                            aria-required='true'
                            autoComplete='off'
                        />
                    </fieldset>
                    <fieldset>
                        <legend><h3>liveURL</h3></legend>
                        <label
                            htmlFor='init-project-repository-input'
                            aria-label='init-project-repository-input'
                            className='project-form-label'
                        />
                        <input
                            id='init-project-repository-input'
                            name='post_repository'
                            type='text'
                            className='project-form-input'
                            placeholder='projectServer'
                            aria-required='true'
                            autoComplete='off'
                        />
                    </fieldset>
                    <fieldset>
                        <legend><h3>progLanguage</h3></legend>
                        <label
                            htmlFor='init-project-tech-stack-input'
                            aria-label='init-project-tech-stack-input'
                            className='project-form-label'
                        />
                        <input
                            id='init-project-tech-stack-input'
                            name='tech_stack'
                            type='text'
                            className='project-form-input'
                            placeholder='projectLanguage'
                            aria-required='true'
                            autoComplete='off'
                        />
                    </fieldset>

                    <button
                        type='submit'
                        className='project-form-submit-button form-button'
                    // disabled={!projectData}
                    >
                        upload
                </button>
                </div>
            </form >
        )
    }
}

export default PostForm