<template>
  <div class="add">
    <van-form>
      <van-field label="room-name" v-model="roomName"></van-field>
      <van-cell>
        <van-button type="primary" round block @click="create">创建</van-button>
      </van-cell>
    </van-form>
  </div>
</template>

<script>
import {createRoom} from "../apis";
import {ref} from "vue";

export default {
  name: "Add",
  setup() {
    const roomName = ref("")
    const create = () => {
      createRoom({
        name: roomName.value
      }).then(res => {
        console.log(res)
      })
    }
    return {create, roomName}
  }
}
</script>

<style lang="less" scoped>
.add {
  padding: 20px;

  .card {
    border-radius: 10px;
    height: 300px;
    display: flex;
    background-color: cornflowerblue;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    color: white;
  }
}
</style>
