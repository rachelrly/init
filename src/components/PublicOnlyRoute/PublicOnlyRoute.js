import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/userContext';

export default function PublicOnlyRoute({ component, ...props }) {
    /*This component controlls redirection for not logged in users*/
    const Component = component;
    return (
        <Route
            {...props}
            render={componentProps => (
                <UserContext.Consumer>
                    {userContext =>
                        !!userContext.user.id
                            ? <Redirect to={'/feed'} />
                            : <Component {...componentProps} />
                    }
                </UserContext.Consumer>
            )}
        />
    );
};