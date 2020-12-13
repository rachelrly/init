import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import '../../css/variables.css';
import '../../css/main.css';
import '../../css/form.css';
import Header from '../Header/Header';
import PublicOnlyRoute from '../publicRoute/PublicOnlyRoute/PublicOnlyRoute';
import PrivateRoute from '../eachUser/PrivateRoute/PrivateRoute';
import Yo from '../publicRoute/Yo/Yo';
//import FollowList from '../eachUser/profilePage/FollowList/FollowList';
import Feed from '../currentUserOnly/Feed/Feed';
import OtherProfile from '../eachUser/profile/OtherProfile/OtherProfile';
import CurrentProfile from '../eachUser/profile/CurrentProfile/CurrentProfile';
import AccountRoute from '../../routes/AccountRoute/AccountRoute';
import AvatarForm from '../currentUserOnly/uploadForms/AvatarForm/AvatarForm';
import PostForm from '../currentUserOnly/uploadForms/PostForm/PostForm';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import AllUserList from '../currentUserOnly/AllUserList/AllUserList';
import UserContext from '../../contexts/userContext';


function App() {
    //get context
    //if context is true in loading
    //loading is true
    //contditionally render 

    const { isLoading } = useContext(UserContext);

    const renderRoutes = () => {
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

                //user specific routes
                <PrivateRoute
                    path={'/feed'}
                    component={Feed}
                />
                <PrivateRoute
                    path={'/account'}
                    component={AccountRoute}
                />
                <PrivateRoute
                    path={'/avatarupload'}
                    component={AvatarForm}
                />
                {/* <PrivateRoute
                    path={'/connections'}
                    component={FollowList}
                /> */}
                <PrivateRoute
                    path={'/newProject'}
                    component={PostForm}
                />
                <PrivateRoute
                    path={'/portfolio'}
                    component={CurrentProfile}
                />
                <PrivateRoute
                    path={'/users'}
                    component={AllUserList}
                />

                //for all users
                <PrivateRoute
                    path={'/user/:id'}
                    component={OtherProfile}
                />
            </Switch>
        );
    };


    return (
        <div className="App">
            <Header />
            <main>
                {renderRoutes()}
            </main>
        </div>
    );

};

export default App;