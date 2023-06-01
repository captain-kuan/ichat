import { Message } from '.';

export enum ChatType {
  group,
  person,
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: ChatType; //聊天对象类型
  isConcern?: boolean; //关注
  isIgnore?: boolean; //忽略
}

export interface GroupChat extends Chat {
  type: ChatType.group;
}

export interface PersonChat extends Chat {
  type: ChatType.person;
}

