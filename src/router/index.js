import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundPage from '../public/pages/NotFoundPage.vue'
import ExamplePage from '../public/pages/ExamplePage.vue'
import RootLayout from '../public/layout/RootLayout.vue'
import EducationalResources from '../public/pages/EducationalResources.vue'

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
        {
          path: '/recursos-educativos',
          component: EducationalResources,
        }
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
})

export default router
