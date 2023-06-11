<template>
  <h3 class="text-center">
    {{ mode === Mode.play ? '播放器' : '录音器' }}
  </h3>
  <Recode
    v-show="mode === Mode.recode"
    ref="record"
    @stop="togglePlayMode"
  ></Recode>

  <Voice v-show="mode === Mode.play" ref="voice" @reset="reset"></Voice>
</template>
<script lang="ts" setup>
import Voice from '@/components/tool/Voice.vue';
import Recode from '@/components/tool/Recode.vue';
enum Mode {
  recode,
  play,
}

const mode = ref(Mode.recode);
const voice = ref<typeof Voice>();
function togglePlayMode(blob: Blob) {
  console.log(blob);

  mode.value = Mode.play;
  voice.value.loadPlayer(blob);
}
function reset() {
  mode.value = Mode.recode;
}
</script>
<style lang="less" scoped></style>
