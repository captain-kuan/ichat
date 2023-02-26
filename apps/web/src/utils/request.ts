import axios from 'axios';
import router from '@/router';
import { Toast } from 'vant';
import 'vant/lib/popup/index.less';
import 'vant/lib/toast/index.less';
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
    if (response.data.code !== 0) {
      Toast.fail(response.data.message);
    }
    return response.data;
  },
  async ({ response }) => {
    if (response.data.code !== 0) {
      if (response.data.message) {
        Toast.fail(response.data.message);
      }
    }
    if (response.status === 401) {
      await router.push('/login');
    }
  },
);
export default instance;
