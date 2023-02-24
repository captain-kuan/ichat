import axios from 'axios';
import router from '../router';

const instance = axios.create({
    baseURL: '/api',
});
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
instance.interceptors.response.use(
    async (response) => {
        return response.data;
    },
    async ({ response }) => {
        if (response.status === 401) {
            await router.push('/login');
        }
    },
);
export default instance;
