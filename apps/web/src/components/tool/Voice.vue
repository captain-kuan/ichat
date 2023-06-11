<template>
  <div class="voice">
    <div class="mt-12 text-2xl text-center p-2 text-gray-600">{{ time }}</div>
    <div ref="playerRef" class="h-14"></div>
    <div ref="timeline"></div>
    <div class="flex justify-between px-6 mt-2">
      <div class="flex flex-col justify-center items-center">
        <van-button class="flex-0" round @click="reset">
          <van-icon name="revoke" />
        </van-button>
      </div>
      <div>
        <van-button round v-show="!hasStart" @click="play">
          <van-icon name="play" />
        </van-button>
        <van-button v-show="hasStart" round @click="togglePlay">
          <van-icon :name="state === '暂停' ? 'play' : 'pause'" />
        </van-button>
      </div>
      <div>
        <van-button round @click="stopPlay">
          <van-icon name="stop"
        /></van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js';
import TimeLinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline';
import { formatSeconds } from '@/utils';

const emit = defineEmits<{
  (event: 'reset'): void;
  (event: 'stop'): void;
}>();

const playerRef = ref(null);
const timeline = ref(null);
const player = ref<WaveSurfer>();
const time = ref('00:00:00');
const state = ref('暂停');
const hasStart = ref(false);

function reset() {
  emit('reset');
  stopPlay()
  hasStart.value = false;
}
watch(hasStart, (v) => {
  if (!v) time.value = '00:00:00';
});
function loadPlayer(blob: Blob) {
  if (player.value) player.value.destroy();
  player.value = WaveSurfer.create({
    container: playerRef.value,
    barWidth: 2,
    barMinHeight: 10,
    barRadius: 1,
    barGap: 2,
    waveColor: '#eee',
    progressColor: '#ff461f',
    fillParent: true,
    hideScrollbar: true,
    scrollParent: true,
    normalize: true,
    plugins: [
      TimeLinePlugin.create({
        container: timeline.value,
        formatTimeCallback(second) {
          return formatSeconds(second, true);
        },
      }),
    ],
  });
  player.value.loadBlob(blob);
}
function play() {
  hasStart.value = true;
  const flushedTime = () => {
    const curTime = player.value.getCurrentTime();
    time.value = formatSeconds(curTime);
    hasStart.value && requestAnimationFrame(flushedTime);
  };
  flushedTime();
  player.value.play();
}
function togglePlay() {
  player.value.playPause();
  state.value = player.value.isPlaying() ? '继续' : '暂停';
}
function stopPlay() {
  hasStart.value = false;
  player.value.stop();
  emit('stop');
}
defineExpose({ loadPlayer });
</script>
