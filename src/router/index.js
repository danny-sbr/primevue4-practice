import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/components',
      children: [
        {
          path: '',
          name: 'components',
          component: () => import('../views/ComponentsView/ComponentsView.vue'),
        },
        {
          path: 'menu',
          name: 'menu',
          component: () =>
            import('../views/ComponentsView/MenuView/MenuView.vue'),
        },
      ],
    },
  ],
})

export default router
