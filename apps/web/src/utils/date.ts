import { default as _dayjs, ConfigType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

_dayjs.extend(relativeTime);
export function dayjs(args: ConfigType) {
  return _dayjs(args).locale('zh-cn');
}
