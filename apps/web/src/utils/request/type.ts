import { Response } from '@ichat/types';
import type { AxiosRequestConfig } from 'axios';
export interface Request {
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
