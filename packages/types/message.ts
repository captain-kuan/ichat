export interface Message {
  id: string
  sendId: string;
  chatId: string;
  message: string;
  sendTime: Date;
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

