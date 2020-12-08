import React, { Component } from 'react';
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import UserContext from '../../contexts/userContext'


class AccountRoute extends Component {
    render() {
        return (
            <UserContext.Consumer>
                {user => (
                    <AccountInformation user={user} />
                )}
            </UserContext.Consumer>

        )
    }
};

export default AccountRoute;