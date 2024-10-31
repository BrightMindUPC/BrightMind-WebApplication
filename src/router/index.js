import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundPage from '../public/pages/NotFoundPage.vue'
import ExamplePage from '../public/pages/ExamplePage.vue'
import RootLayout from '../public/layout/RootLayout.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: RootLayout,
      children: [
        {
          path: '/example',
          component: ExamplePage,
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
})

export default router
