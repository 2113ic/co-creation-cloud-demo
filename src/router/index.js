import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'Login',
          component: () => import('@/views/login/index.vue'),
        },
        {
          path: '/resource-search',
          name: 'ResourceSearch',
          component: () => import('@/views/resource-search/index.vue'),
          props: (route) => ({ tab: route.query.tab || 1 }),
        },
        {
          path: '/data',
          name: 'Data',
          component: () => import('@/views/login/index.vue'),
        },
      ],
    },
  ],
})
