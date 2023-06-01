import { MessageEvent } from '@ichat/types';
import { SocketClient } from '@/utils';
import { useMessageStore } from '@/store';

async function core() {
  const client = await SocketClient.getClient();
  client.on(MessageEvent.message, (message) => {
    
  });
}
