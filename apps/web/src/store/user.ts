import { User } from '@ichat/types';
import { authApis, LoginParams, userApis } from '@/apis';
import { emitter } from '@/utils';
import { pinia } from '.';

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({ id: '', name: '', avatar: '' });
  const login = async (params: LoginParams) => {
    const { code, data } = await authApis.login(params);
    if (code === 0) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('account', params.account);
      emitter.emit('login');
    }
    return { code };
  };
  const getUserInfo = async () => {
    const { code, data } = await userApis.getUserInfo();
    if (code === 0) {
      user.value = data;
    }
  };
  return { user, login, getUserInfo };
});
export function useUserStoreWiteOut() {
  return useUserStore(pinia);
}
