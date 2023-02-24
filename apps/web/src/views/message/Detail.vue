<template>
  <div class="room">
    <div>
      <message-item v-for="msg in messages" :msg="msg" :is-self="isSelf(msg)">
      </message-item>
    </div>
    <van-field
      class="sticky"
      v-model="input"
      border
      placeholder="发送消息"
      @keydown.enter="send"
    >
      <template #button>
        <van-button type="success" @click="send">send</van-button>
      </template>
    </van-field>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import MessageItem from "@/components/MessageItem.vue";
import { Message } from "@/types";
const messages = reactive<Message[]>([
  {
    id: "",
    message: "",
    roomId: "",
    userId: "",
    time: 123,
  },
]);

const input = ref("");
const isConnected = ref(false);
const isSelf = (msg: Message): boolean => {
  return msg.userId === "";
};
const ws = ref(null);
connect();

function connect() {
  ws.value = new WebSocket("ws://localhost:57978");
}

ws.value.onopen = () => {
  isConnected.value = true;
};
ws.value.onmessage = function (e) {
  messages.push({
    time: 123123,
    message: e.data,
    roomId: "",
    userId: "",
    id: "",
  });
};
ws.value.onclose = function () {
  isConnected.value = false;
};
ws.value.onerror = () => {
  isConnected.value = false;
};

const send = () => {
  ws.value.send(input.value);
  messages.push({
    time: 123123,
    message: input.value,
    roomId: "",
    userId: "",
    id: "",
  });
  input.value = "";
};
</script>

<style scoped>
.room {
  box-sizing: border-box;
  flex: 1;
  padding: 20px 20px;
  display: flex;
  background-color: #efefef;
  flex-direction: column;
  justify-content: space-between;
}
</style>
