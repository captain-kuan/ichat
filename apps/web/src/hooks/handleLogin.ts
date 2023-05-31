import { socket, emitter } from '@/utils';
import { useChatsStore } from '@/store';
import { MessageEvent } from '@ichat/types';
import { showDialog } from 'vant';
import 'vant/es/dialog/style/index';
export function handleLogin() {
  const token = localStorage.getItem('token');
  const { handleMessage, addFriend } = useChatsStore();
  const callback = async (token: string) => {
    await socket.init({ token });

    socket.addMessageHandler(MessageEvent.message, (msg) => {
      handleMessage(msg);
    });
    socket.addMessageHandler(MessageEvent.addFriend, (msg) => {
      showDialog({ message: 'addFriend' }).then(() => {
        console.log(msg);
        addFriend(msg);
      });
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
