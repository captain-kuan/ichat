import request from '../utils/request';
interface LoginParams {
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
    return request({
        url: '/auth/register',
        method: 'post',
        data,
    });
}
