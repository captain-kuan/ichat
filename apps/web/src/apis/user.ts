import request from '../utils/request';
type Response<T> = Promise<{
  code: number;
  data: T;
  msg: string;
}>;

export function getUserInfo() {
  return request.get<{
    id: string
    name: string;
    avatar: string;
  }>('/user');
}
export function changeUserInfo(userinfo: {
  name?: string;
  avatar?: string;
}) {
  return request.put<void>('/user', userinfo);
}
export function searchUserByName(account: string) {
  return request.get('/user/searchByName', { params: { account } });
}
