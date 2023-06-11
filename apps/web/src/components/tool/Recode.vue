<template>
  <div class="recode">
    <div class="mt-12 text-2xl text-center p-2 text-gray-600">{{ time }}</div>
    <div ref="recorderRef" class="h-14"></div>
    <div class="flex justify-between px-6 mt-2">
      <div class="flex flex-col justify-center items-center">
        <van-button class="flex-0" round @click="reset">
          <van-icon name="revoke" />
        </van-button>
      </div>
      <div class="flex">
        <div
          v-show="!hasStart"
          class="flex flex-col justify-center items-center"
        >
          <van-button round @click="recode">
            <van-icon name="play" />
          </van-button>
        </div>
        <div
          v-show="hasStart"
          class="flex flex-col justify-center items-center"
        >
          <van-button round @click="toggleRecode">
            <van-icon :name="isPaused ? 'play' : 'pause'" />
          </van-button>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <van-button round @click="stopRecode">
          <van-icon name="stop" />
        </van-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import WaveSurfer from 'wavesurfer.js';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone';
import { Timer, formatSeconds } from '@/utils';

const recorderRef = ref(null);
const recorder = ref<WaveSurfer>();
const blob = ref<Blob>();

const time = ref('00:00:00');
const timer = new Timer();
const hasStart = ref(false);

const emit = defineEmits<{
  (event: 'reset'): void;
  (event: 'stop', blob: Blob): void;
}>();

const isPaused = computed(() => {
  // @ts-ignore
  return recorder.value?.microphone?.paused;
});
let stopReason = 'reset';
function reset() {
  stopRecode('reset');
  emit('reset');
}
function flushedTime() {
  const curTime = timer.duration / 1000;
  time.value = formatSeconds(curTime);
  hasStart.value && requestAnimationFrame(flushedTime);
}
function recode() {
  if (recorder.value) {
    recorder.value.microphone.destroy();
    recorder.value.destroy();
  }
  hasStart.value = true;
  recorder.value = WaveSurfer.create({
    container: recorderRef.value,
    barWidth: 2,
    barGap: 2,
    barRadius: 2,
    scrollParent: true,
    cursorWidth: 0,
    waveColor: '#ff461f',
    plugins: [
      MicrophonePlugin.create({
        constraints: {
          audio: true,
        },
      }),
    ],
  });
  timer.reset();

  recorder.value.microphone.start();
  timer.start();

  flushedTime();
  recorder.value.microphone.on('deviceReady', (stream) => {
    const rec = new MediaRecorder(stream, {
      audioBitsPerSecond: 44100,
      mimeType: 'audio/webm',
    });
    rec.ondataavailable = (e) => {
      blob.value = new Blob([e.data], { type: 'audio/webm' });
      if (stopReason !== 'reset') emit('stop', blob.value);
    };
    rec.start();
  });
}
function toggleRecode() {
  recorder.value.microphone.togglePlay();
  //@ts-ignore
  if (recorder.value.microphone.paused) {
    timer.pause();
  } else {
    timer.resume();
  }
}
function stopRecode(reason = 'stop') {
  stopReason = reason;
  recorder.value.microphone.stop();
  hasStart.value = false;
  timer.reset();
  flushedTime();
}
</script>
