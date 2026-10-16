import { ChatType, Message, MessageEvent } from '@ichat/types';
import { SocketClient } from '@/utils';
import {
  useMessageStoreWithOut,
  useChatsStoreWithOut,
  useUserStoreWiteOut,
} from '@/store';
import { useLoginCallBack } from '@/hooks';
import { messageApis } from '@/apis';
import { showNotify } from 'vant';

let client: SocketClient;
export function useCore() {
  const messageStore = useMessageStoreWithOut();
  const chatStore = useChatsStoreWithOut();
  const useStore = useUserStoreWiteOut();

  function initCore() {
    useLoginCallBack(async (token) => {
      client = await SocketClient.getClient(token);
      const { code, data } = await messageApis.syncMessages(
        messageStore.lastSyncAt || undefined,
      );
      if (code === 0) {
        messageStore.applySyncedMessages(data || []);
      }

      client.on(MessageEvent.message, (message) => {
        messageStore.addMessage(message);
        const chatId =
          message.type === ChatType.group
            ? message.groupId || message.toId
            : message.sendId === useStore.user.id
              ? message.toId
              : message.sendId;
        chatStore.updateActiveChat(chatId, message);
      });
      client.on(MessageEvent.sendSuccess, (message) => {});
      client.on(MessageEvent.addChat, (message) => {
        showNotify({
          type: 'primary',
          message: `${message.sendId} 请求添加你为好友`,
        });
      });
    });
  }

  function sendMessage(message: Message) {
    if (client) {
      client.emit(MessageEvent.message, {
        ...message,
        sendId: useStore.user.id,
      });
      messageStore.addMessage(message);
      const chatId =
        message.type === ChatType.group ? message.groupId || message.toId : message.toId;
      chatStore.updateActiveChat(chatId, message);
    } else {
      // TODO: 消息重发
      console.log(client);
    }
  }
  return { initCore, sendMessage };
}
