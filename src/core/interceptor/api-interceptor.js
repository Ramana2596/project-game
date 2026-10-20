import axios from 'axios';

/*
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL //Production API Base URL
    // baseURL: process.env.REACT_APP_DEV_API_BASE_URL //Development API Base URL - enable this line for development
});
*/

// npm start -> local backend. For net, Vercel build -> ngrok address.
// To test production from your computer: set REACT_APP_USE_PROD_API=true in .env, then restart.
const useLocal =
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_USE_PROD_API !== 'true';

const baseURL = useLocal
    ? process.env.REACT_APP_DEV_API_BASE_URL   // http://localhost:4000
    : process.env.REACT_APP_API_BASE_URL;      // For internet users, ngrok address

const api = axios.create({ baseURL });

api.defaults.headers.common['ngrok-skip-browser-warning'] = `true`; // Replace 'token' with your actual token or a function to get the token

// Add a request interceptor
api.interceptors.request.use(config => {
    // Add authorization token or other headers if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
api.interceptors.response.use(response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
}, error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
});

export default api;
