import axios from 'axios';
import router from '@/router';
import { showToast } from 'vant';

import { Request } from './type';

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
      showToast({
        message: response.data.msg,
        type: 'fail',
      });
    }
    return response.data;
  },
  ({ response }) => {
    if (response.data.code !== 0) {
      if (response.data.msg) {
        showToast({
          message: response.data.msg,
          type: 'fail',
        });
      }
    }
    nextTick(async () => {
      const route = useRoute();
      if (response.status === 401) {
        await router.push({
          path: '/login',
          query: { redirect: route?.fullPath },
        });
      }
    });
  },
);

export default instance as Request;
