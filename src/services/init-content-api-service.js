import config from '../config';
import TokenService from './token-service';


const InitContentApiService = {
    getAvatar() {
        return fetch(`${config.API_ENDPOINT}/avatar/download`, {
            method: "GET",
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res.json()
            );
    },

    postAvatar(file) {
        return fetch(`${config.API_ENDPOINT}/avatar/upload`, {
            method: "POST",
            body: new FormData(file),
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res
            );
    },

    updateAvatar(file, update) {
        return fetch(`${config.API_ENDPOINT}/avatar/upload/${update}`, {
            method: 'PATCH',
            body: new FormData(file),
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : null
            );
    },

    postInitProject(file) {
        return fetch(`${config.API_ENDPOINT}/post/upload`, {
            method: "POST",
            body: new FormData(file),
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(event => Promise.reject(event))
                    : res
            );
    },

    getPost(post_id) {
        return fetch(`${config.API_ENDPOINT}/post/${post_id}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    getPostComments(post_id) {
        return fetch(`${config.API_ENDPOINT}/comment/${post_id}`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    postComment(post_id, text) {
        return fetch(`${config.API_ENDPOINT}/comment/${post_id}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ text })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );

    },

    getAllUsers() {
        return fetch(`${config.API_ENDPOINT}/user`, {
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    }
}

export default InitContentApiService;