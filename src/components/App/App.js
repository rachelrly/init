import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../css/variables.css';
import '../../css/main.css';
import '../../css/form.css';
import Header from '../Header/Header';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Yo from '../Yo/Yo';
import FollowList from '../FollowList/FollowList';
import Feed from '../Feed/Feed';
import Portfolio from '../../routes/PortfolioRoute/PortfolioRoute';
import PortfolioAdjacent from '../../routes/PortfolioAdjacentRoute/PortfolioAdjacentRoute';
import AccountRoute from '../../routes/AccountRoute/AccountRoute';
import AvatarForm from '../AvatarForm/AvatarForm';
import PostForm from '../PostForm/PostForm';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import AllUserList from '../AllUserList/AllUserList';

class App extends Component {
    renderRoutes() {
        return (
            <Switch>
                <PublicOnlyRoute
                    exact
                    path={'/'}
                    component={Yo}
                />
                <PublicOnlyRoute
                    path={'/login'}
                    component={LoginRoute}
                />
                <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationRoute}
                />
                <PrivateRoute
                    path={'/account'}
                    component={AccountRoute}
                />
                <PrivateRoute
                    path={'/avatarupload'}
                    component={AvatarForm}
                />
                <PrivateRoute
                    path={'/connections'}
                    component={FollowList}
                />
                <PrivateRoute
                    path={'/feed'}
                    component={Feed}
                />
                <PrivateRoute
                    path={'/newProject'}
                    component={PostForm}
                />
                <PrivateRoute
                    path={'/portfolio'}
                    component={Portfolio}
                />
                <PrivateRoute
                    path={'/users'}
                    component={AllUserList}
                />
                <PrivateRoute
                    path={'/user/:id'}
                    component={PortfolioAdjacent}
                />

            </Switch>
        );
    };

    render() {
        return (
            <div className="App">
                <Header />
                <main>
                    {this.renderRoutes()}
                </main>
            </div>
        );
    };
};

export default App;