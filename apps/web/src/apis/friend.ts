import { Chat } from '@/types';
import request from '@/utils/request';

export function getFriends() {
  return request.get<Chat[]>('/friend');
}

export function sendAddFriend(data: { friendId: string }) {
  return request.post('/friend/sendAdd', data);
}

export function agreeAddFriend(data: { friendId: string }) {
  return request.post('/friend/agreeAdd', data);
}
