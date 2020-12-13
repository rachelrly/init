import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import FollowService from '../services/follow-service';

const UserContext = React.createContext({
    user: {},
    error: null,
    isLoggedIn: null,
    isLoading: null,
    setLoading: () => { },
    setError: () => { },
    clearError: () => { },
    setUser: () => { },
    setUserFollowing: () => { },
    setUserFollows: () => { },
    processLogin: () => { },
    processLogout: () => { },

});

export default UserContext;

export class UserProvider extends Component {
    constructor(props) {
        super(props)

        const state = {
            user: {},
            error: null,
            loading: false
        }

        const jwtPayload = TokenService.parseAuthToken();

        if (jwtPayload)
            state.user = {
                id: jwtPayload.user_id,
                fullname: jwtPayload.fullname,
                username: jwtPayload.sub,
                email: jwtPayload.email,
                about_user: jwtPayload.about_user,
                user_stack: jwtPayload.user_stack,
            };

        this.state = state;
        IdleService.setIdleCallback(this.logoutBecauseIdle);
    };

    componentDidMount() {

        const getFollows = async () => {
            const { followingUser, followedByUser } = await FollowService.getFollowLists();

            const user = {
                ...this.state.user,
                following: followedByUser,
                followers: followingUser
            }

            this.setUser(user);
        }

        if (TokenService.hasAuthToken()) {

            IdleService.regiserIdleTimerResets()
            TokenService.queueCallbackBeforeExpiry(() => {
                this.fetchRefreshToken()
            });

            if (!this.state.isLoggedIn) {
                this.setIsLoggedIn();
            };

            if (!this.state.user.following) {
                getFollows();
            }
        };
    }

    componentWillUnmount() {
        IdleService.unRegisterIdleResets();
        TokenService.clearCallbackBeforeExpiry();
    };

    setError = error => {
        console.error(error);
        this.setState({ error });
    }

    clearError = () => {
        this.setState({ error: null });
    };

    setUser = user => {
        this.setState({ user });
    };

    setUserFollowing = following => {
        this.setState({
            user: { ...this.state.user, following }
        })
    };

    setUserFollows = follows => {
        this.setState({
            user: { ...this.state.user, ...follows }
        })
    };

    setIsLoggedIn = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn });
    };

    processLogin = async authToken => {
        this.setLoading(true)
        TokenService.saveAuthToken(authToken);
        const jwtPayload = TokenService.parseAuthToken();

        const { followingUser, followedByUser } = await FollowService.getFollowLists();

        this.setUser({
            id: jwtPayload.user_id,
            fullname: jwtPayload.fullname,
            username: jwtPayload.sub,
            email: jwtPayload.email,
            about_user: jwtPayload.about_user,
            user_stack: jwtPayload.user_stack,
            following: followedByUser,
            followers: followingUser

        });
        IdleService.regiserIdleTimerResets();
        TokenService.queueCallbackBeforeExpiry(() => {
            this.fetchRefreshToken();
        })
        this.setIsLoggedIn(true);
        //set loading to true
        //set up loading conditional rendering in login form

    };

    processLogout = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        this.setIsLoggedIn(false);
        this.setUser({});

    };

    logoutBecauseIdle = () => {
        TokenService.clearAuthToken();
        TokenService.clearCallbackBeforeExpiry();
        IdleService.unRegisterIdleResets();
        this.setIsLoggedIn(false);
        this.setUser({ idle: true });
    }

    fetchRefreshToken = async () => {
        AuthApiService.refreshToken()
            .then(res => {
                TokenService.saveAuthToken(res.authToken)
                TokenService.queueCallbackBeforeExpiry(() => {
                    this.fetchRefreshToken()
                });
            })
            .catch(err => {
                this.setError(err)
            });

        const { followingUser, followedByUser } = await FollowService.getFollowLists();
        const user = {
            ...this.state.user,
            following: followedByUser,
            followers: followingUser
        }
        this.setUser(user);
    };

    setLoading = loading => {
        this.setState({
            loading
        });
    };


    render() {
        const value = {
            user: this.state.user,
            error: this.state.error,
            isLoggedIn: this.state.isLoggedIn,
            isLoading: this.state.loading,
            setLoading: this.setLoading,
            setError: this.setError,
            clearError: this.clearError,
            setUser: this.setUser,
            setUserFollowing: this.setUserFollowing,
            setUserFollows: this.setUserFollows,
            processLogin: this.processLogin,
            processLogout: this.processLogout,

        };

        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        );
    };
}