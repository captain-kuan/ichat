export interface Message {
  sendId: string;
  chatId: string;
  targetId: string;
  message: string;
  sendTime: string;
}
export enum ChatType {
  group,
  person,
}

export interface Chat {
  type: ChatType;
  name: string;
  id: string;
  isConcern?: boolean;
  isIgnore?: boolean;
  avatar: string;
}

export interface GroupChat extends Chat {
  type: ChatType.group;
}

export interface PersonChat extends Chat {
  type: ChatType.person;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
