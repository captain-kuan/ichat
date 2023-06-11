import { RouteRecordRaw } from 'vue-router';

export const commonRoute: RouteRecordRaw = {
  path: '/common',
  children: [
    {
      path: 'tool',
      component: () => import('@/views/common/Tool.vue'),
    },
  ],
};
