import { default as _dayjs, ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

_dayjs.extend(relativeTime);
export function dayjs(args: ConfigType) {
  return _dayjs(args).locale('zh-cn');
}

export function formatSeconds(seconds: number, hideZeroHour?: boolean): string {
  seconds = seconds | 0;
  const hour = Math.floor(seconds / 3600);
  const minute = Math.floor((seconds - hour * 3600) / 60);
  const second = seconds - hour * 3600 - minute * 60;
  const hourStr = hour.toString().padStart(2, '0');
  return `${hideZeroHour && hour === 0 ? '' : hourStr}:${minute
    .toString()
    .padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
}
export class Timer {
  startTime: number;
  pauseTime: number;
  totalPausedTime: number;
  constructor() {
    this.startTime = null;
    this.pauseTime = null;
    this.totalPausedTime = 0;
  }

  start() {
    if (!this.startTime) {
      this.startTime = Date.now();
    } else if (this.pauseTime) {
      this.totalPausedTime += Date.now() - this.pauseTime;
      this.pauseTime = null;
    }
  }

  pause() {
    this.pauseTime = Date.now();
  }

  resume() {
    if (this.pauseTime) {
      this.totalPausedTime += Date.now() - this.pauseTime;
      this.pauseTime = null;
    }
  }

  reset() {
    this.startTime = null;
    this.pauseTime = null;
    this.totalPausedTime = 0;
  }

  get duration() {
    if (!this.startTime) {
      return 0;
    } else if (this.pauseTime) {
      return this.pauseTime - this.startTime - this.totalPausedTime;
    } else {
      return Date.now() - this.startTime - this.totalPausedTime;
    }
  }
}
