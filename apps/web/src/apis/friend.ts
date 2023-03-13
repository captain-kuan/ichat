import request from '@/utils/request';

export function getFriends() {
  return request.get('/friend');
}

export function searchAccountByName(){
  return request.post
}