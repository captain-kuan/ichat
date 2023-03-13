import { Response } from '@ichat/types';
export interface ErrorResponse extends Response<void> {
  time?: number;
  path?: string;
}
