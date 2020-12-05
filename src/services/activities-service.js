import config from '../config';
import TokenService from './token-service';

const ActivitiesService = {

    getUnreadActivity() {
        return fetch(`${config.API_ENDPOINT}/activity`, {
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

}

export default ActivitiesService;