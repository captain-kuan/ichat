<template>
  <div class="message-item" v-if="!isSelf">
    <van-image class="header" />
    <div class="message-content">
      <p class="name">{{ msg.name }}</p>
      <p class="message">
        {{ msg }}
      </p>
    </div>
  </div>
  <div v-else class="message-item self">
    <div class="message-content">
      <p class="message">
        {{ msg }}
      </p>
    </div>
    <van-image class="header" />
  </div>
</template>

<script lang="ts" setup>
import { Message } from "@/types";
defineProps<{ isSelf: boolean; msg: Message }>();
</script>

<style lang="scss" scoped>
.message-item {
  display: flex;
  box-sizing: border-box;
  margin-bottom: 20px;

  .header {
    width: 80px;
    height: 80px;
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
      line-height: 60px;
      background-color: $box-color;
      padding: 10px;
      color: #666;
      font-size: 30px;
      position: relative;
      word-break: break-all;

      &:after {
        content: "";
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
    .header {
      margin: 0 0 0 20px;
    }

    .name {
      text-align: right;
    }

    .message {
      $box-color: #91b8f1;
      background-color: $box-color;

      &:after {
        content: "";
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
