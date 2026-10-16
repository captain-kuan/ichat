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

export interface PendingFriendRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
  expiredAt: string;
  fromUser?: {
    id: string;
    name?: string;
    account?: string;
    avatar?: string;
  };
}

export function getPendingFriendRequests() {
  return request.get<PendingFriendRequest[]>('/friend/pending');
}
