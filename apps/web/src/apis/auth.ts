import request from '@/utils/request';
export interface LoginParams {
    account: string;
    password: string;
}
export function login(data: LoginParams): Promise<any> {
    return request({
        url: '/auth/login',
        method: 'post',
        data,
    });
}
interface RegisterParams {
    account: string;
    password: string;
}
export function register(data: RegisterParams) {
    return request.post<any>('/auth/register', data);
}
