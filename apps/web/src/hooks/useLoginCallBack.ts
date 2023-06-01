import { emitter } from '@/utils';
import { useOnceCall } from '.';

const loop = () => {};
type LoginCallBack = (token?: string) => any;
const callbacks = new Set<LoginCallBack>();

export function useLoginCallBack(callback: LoginCallBack = loop) {
  callbacks.add(useOnceCall(callback));
  function loginCallBack() {
    const token = localStorage.getItem('token');
    if (token) {
      callbacks.forEach((fn) => fn(token));
    }
  }
  loginCallBack();
  emitter.on('login', loginCallBack);
}
