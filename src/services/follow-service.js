import config from '../config';
import TokenService from './token-service';

const FollowService = {

    getFollowLists() {
        return fetch(`${config.API_ENDPOINT}/follow`, {
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
    getFollowListWithUserId(id) {
        //set up own dynamic endpoint
        return fetch(`${config.API_ENDPOINT}/follow/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    follow(following_id) {
        return fetch(`${config.API_ENDPOINT}/follow`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ following_id })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    unfollow(following_id) {
        return fetch(`${config.API_ENDPOINT}/follow`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify({ following_id })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    }
}


export default FollowService;