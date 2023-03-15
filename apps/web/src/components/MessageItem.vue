<template>
  <div class="message-item flex" :class="{ self: message.isSelf }">
    <div class="message-content">
      <p class="message rounded shadow-sm">
        {{ message.content }}
      </p>
    </div>
    <van-image class="header" />
  </div>
</template>

<script lang="ts" setup>
import { Message } from '@ichat/types';
defineProps<{
  message: Pick<Message & { isSelf: boolean }, 'content' | 'isSelf'>;
}>();
</script>

<style lang="scss" scoped>
.message-item {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  flex-direction: row-reverse;
  .header {
    width: 60px;
    height: 60px;
    margin: 0 20px 0 0;
  }

  .message-content {
    flex: 1;

    .name {
      font-size: 30px;
      line-height: 1.5;
    }

    .message {
      $box-color: #fff;
      flex: 1;
      min-height: 60px;
      background-color: $box-color;
      padding: 10px;
      color: #666;
      position: relative;
      word-break: break-all;

      &:after {
        content: '';
        top: 10px;
        left: 0;
        transform: translateX(-100%);
        border: transparent solid 10px;
        border-right-color: $box-color;
        position: absolute;
      }
    }
  }

  &.self {
    flex-direction: row;
    .header {
      margin: 0 0 0 20px;
    }

    .name {
      text-align: right;
    }

    .message {
      $box-color: #77a9f3;
      background-color: $box-color;

      &:after {
        content: '';
        top: 10px;
        right: 0;
        transform: translateX(100%);
        border: transparent solid 10px;
        border-left-color: $box-color;
        position: absolute;
      }
    }
  }
}
</style>
