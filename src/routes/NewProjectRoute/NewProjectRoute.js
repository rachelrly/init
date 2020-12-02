import React, { Component } from 'react';
import PostForm from '../../components/PostForm/PostForm'

class NewProject extends Component {
    render() {
        return (
            <div className='new-project-wrapper'>
                <PostForm
                    history={this.props.history}
                />
            </div>
        );
    };
};

export default NewProject;