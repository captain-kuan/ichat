import { Message, Chat } from '@ichat/types';
export * from '@ichat/types';
export interface Room {
  roomId: string;
  users?: string[];
}

export interface User {
  userId: string;
  avatar: string;
  name: string;
}

export interface UserSelf extends User {
  token?: string;
}

export interface RootState {
  ws: null;
  messages: Message[];
  rooms: Room[];
  users: User[];
  user: UserSelf;
}

export type ActiveChat = Chat & { lastMsg?: Message };
