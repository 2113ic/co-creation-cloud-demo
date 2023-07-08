import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/resource-search',
      children: [
        {
          path: '/resource-search',
          name: 'ResourceSearch',
          component: () => import('@/layouts/SearchLayout.vue'),
        }
      ]
    }
  ]
})
