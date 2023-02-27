<template>
  <div>
    <video ref="video"></video>
    <button @click="face">face</button>
  </div>
</template>

<script lang="ts" setup>
const video = ref<HTMLVideoElement>();

const face = () => {
  console.log(navigator.mediaDevices.enumerateDevices());
  
  navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true })
    .then((stream) => {
      video.value.srcObject = stream;
      video.value.onloadedmetadata = () => {
        video.value.play();
      };
    })
    .catch((err) => {
      console.error(`${err.name}: ${err.message}`);
    });
};
</script>
