export interface Message {
  id: string;
  roomId: string;
  userId: string;
  message: string;
  time: number;
}

export interface Room {
  roomId: string;
  users?: string[];
}

export interface User {
  userId: string;
  header: string;
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
