import React, { Component } from 'react'

const InitContentContext = React.createContext({
    data: null,
    projectData: null,
    setData: () => { },
    setProjectData: () => { },
});

export default InitContentContext;

export class InitContentProvider extends Component {
    state = {
        data: null,
        projectData: null
    };

    setData = () => {
        this.setState({ data: !this.state.data });
    };

    setProjectData = () => {
        this.setState({ projectData: !this.state.projectData });
    };

    render() {
        const value = {
            data: this.state.data,
            projectData: this.state.projectData,
            setData: this.setData,
            setProjectData: this.setProjectData,
        };
        return (
            <InitContentContext.Provider value={value}>
                {this.props.children}
            </InitContentContext.Provider>
        )
    }
}