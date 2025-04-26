import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_BASE_URL
});

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
