import { Message } from '@ichat/types';
import request from '@/utils/request';

export function syncMessages(since?: number) {
  return request.get<Message[]>('/message/sync', {
    params: since ? { since } : undefined,
  });
}
