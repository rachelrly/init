import config from '../config';
import TokenService from './token-service';

const AuthApiService = {
    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
    postLogin({ username, user_password }) {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ username, user_password }),
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(err => Promise.reject(err))
                    : res.json()
            );
    },
    refreshToken() {
        return fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },
}

export default AuthApiService;