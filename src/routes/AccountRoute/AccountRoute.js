import React, { Component } from 'react';
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import UserContext from '../../contexts/userContext'


class AccountRoute extends Component {
    render() {
        return (
            <div className='account-route'>
                <UserContext.Consumer>
                    {user => (
                        <AccountInformation user={user} />
                    )}
                </UserContext.Consumer>
            </div>
        )
    }
};

export default AccountRoute;