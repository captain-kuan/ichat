import { socket, emitter } from '@/utils';
import { useChatsStore } from '@/store';
import { MessageType } from '@/utils/socket';
export function handleLogin() {
  const token = localStorage.getItem('token');
  const { handleMessage } = useChatsStore();
  const callback = (token: string) => {
    socket.init({ token });
    socket.addMessageHandler(MessageType.connect, (msg) => {
      handleMessage(msg);
    });
  };
  if (token) {
    callback(token);
  } else {
    emitter.on('login', () => {
      callback(localStorage.getItem('token'));
    });
  }
}
