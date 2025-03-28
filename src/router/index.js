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
        {
          path: 'data-table',
          name: 'data-table',
          component: () =>
            import('../views/ComponentsView/DataTableView/DataTableView.vue'),
        },
        {
          path: 'input',
          name: 'input',
          component: () =>
            import('../views/ComponentsView/InputView/InputView.vue'),
        },
        {
          path: 'drawer',
          name: 'drawer',
          component: () =>
            import('../views/ComponentsView/DrawerView/DrawerView.vue'),
        },
        {
          path: 'organization-chart',
          name: 'organization-chart',
          component: () =>
            import(
              '../views/ComponentsView/OrganizationChartView/OrganizationChartView.vue'
            ),
        },
        {
          path: 'dialog',
          name: 'dialog',
          component: () =>
            import('../views/ComponentsView/DialogView/DialogView.vue'),
        },
        {
          path: 'file-upload',
          name: 'file-upload',
          component: () =>
            import('../views/ComponentsView/FileUploadView/FileUploadView.vue'),
        },
      ],
    },
    {
      path: '/pass-through',
      name: 'pass-through',
      component: () => import('../views/PassThroughView/PassThroughView.vue'),
    },
  ],
})

export default router
