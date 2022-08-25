import { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: () => import('~/layout/Layout.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('~/views/index/Index.vue'),
        meta: {},
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('~/views/notFound/NotFound.vue'),
  },
]
