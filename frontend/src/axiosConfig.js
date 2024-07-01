import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axios;
