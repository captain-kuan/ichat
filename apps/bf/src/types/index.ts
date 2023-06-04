import { Response } from '@ichat/types';
export enum ChatType {
  group = 'g',
  person = 'p',
  system = 's',
}
export interface ErrorResponse extends Response<void> {
  time?: number;
  path?: string;
}
