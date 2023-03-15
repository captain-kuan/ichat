export interface Message {
  id: string;
  sendId: string;
  toId: string;
  content: string;
  sendTime: Date;
}

export enum MessageEvent {
  message = 'message',
  addFriend = 'addFriend',
}

export enum ChatType {
  group,
  person,
}

export interface Chat {
  type: ChatType;
  name: string;
  id: string;
  isConcern?: boolean; //关注
  isIgnore?: boolean; //忽略
  avatar: string;
}

export interface GroupChat extends Chat {
  type: ChatType.group;
}

export interface PersonChat extends Chat {
  type: ChatType.person;
}
