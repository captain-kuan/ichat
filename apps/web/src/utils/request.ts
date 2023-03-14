import axios, {
  Axios,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import router from '@/router';
import { Toast } from 'vant';
import 'vant/lib/popup/index.less';
import 'vant/lib/toast/index.less';
import { Response } from '@ichat/types';
interface Request {
  <T = any, R = Response<T>>(config: AxiosRequestConfig): Promise<R>;
  <T = any, R = Response<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R>;
  get<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  delete<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  head<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  options<T = any, R = Response<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  post<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  put<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
  patch<T = any, R = Response<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<R>;
}
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
  ({ response }) => {
    if (response.data.code !== 0) {
      if (response.data.message) {
        Toast.fail(response.data.message);
      }
    }
    nextTick(async () => {
      const route = useRoute();
      console.log(route);

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
