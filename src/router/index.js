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
      path: '/theme',
      children: [
        {
          path: '',
          name: 'theme',
          component: () => import('../views/ThemeView/ThemeView.vue'),
        },
        {
          path: 'styled-mode',
          name: 'styled-mode',
          component: () =>
            import('../views/ThemeView/StyledModeView/StyledModeView.vue'),
        },
      ],
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
        {
          path: 'tabs',
          name: 'tabs',
          component: () =>
            import('../views/ComponentsView/TabsView/TabsView.vue'),
        },
      ],
    },
  ],
})

export default router
