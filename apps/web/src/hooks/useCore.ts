import { ChatType, Message, MessageEvent } from '@ichat/types';
import { SocketClient } from '@/utils';
import {
  useMessageStoreWithOut,
  useChatsStoreWithOut,
  useUserStore,
  useUserStoreWiteOut,
} from '@/store';

const client = shallowRef<SocketClient>();

export function useCore() {
  const messageStore = useMessageStoreWithOut();
  const chatStore = useChatsStoreWithOut();
  const useStore = useUserStoreWiteOut();

  async function initCore() {
    client.value = await SocketClient.getClient();
    console.log('initCore', client.value);

    client.value.on(MessageEvent.message, (message) => {
      messageStore.addMessage(message);
      chatStore.updateActiveChatByMessage(message);
    });
    client.value.on(MessageEvent.addChat, (message) => {});
  }
  function seenMessage(
    message: Pick<Message, 'content' | 'toId' | 'type' | 'formId'>,
  ) {
    if (client.value) {
      client.value.emit(MessageEvent.message, {
        ...message,
        sendId: useStore.user.id,
      });
      messageStore.addMessage({
          ...message,
          sendId: useStore.user.id,
          id: '',
          sendTime: new Date()
      });
    } else {
      // TODO: 消息重发
      console.log(client.value);
    }
  }
  return { initCore, seenMessage };
}
