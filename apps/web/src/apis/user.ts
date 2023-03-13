import request from '../utils/request';
type Response<T> = Promise<{
  code: number;
  data: T;
  msg: string;
}>;

export function getUserInfo(): Response<{
  Uname: string;
  UAvatar: string;
}> {
  return request.get('/user');
}
export function changeUserInfo(userinfo: {
  Uname?: string;
  UAvatar?: string;
}): Response<void> {
  return request.put('/user', userinfo);
}
export function searchUserByName(account: string) {
  return request.get('/user/searchByName', { params: { account } });
}
