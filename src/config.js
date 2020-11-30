let apiPath
let tokenKey

if (process.env.NODE_ENV === 'production') {
    apiPath = 'http://localhost:8000/api'
    tokenKey = 'init-client-auth-token'
} else {
    apiPath = 'http://localhost:8000/api'
    tokenKey = 'init-client-auth- token'
}

export default {
    API_ENDPOINT: apiPath,
    TOKEN_KEY: tokenKey,
}


/* LOGIN INFO
Time Traveller Trunks

ssRAGE2!

*/