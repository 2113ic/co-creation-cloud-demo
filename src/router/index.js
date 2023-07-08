import { createRouter, createWebHashHistory } from 'vue-router'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
