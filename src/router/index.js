import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '../public/pages/NotFoundPage.vue'
import ExamplePage from '../public/pages/ExamplePage.vue'
import RootLayout from '../public/layout/RootLayout.vue'
import ResourceDetailPage from '../resources/pages/ResourceDetailPage.vue'
import ChatbotMainPage from '../chatbot-search/pages/ChatbotMainPage.vue'
import EducationalResources from '../public/pages/EducationalResources.vue'

const router = createRouter({
  history: createWebHistory(),
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
          path: '/educational-resources',
          component: EducationalResources,
        },
        {
          path: '/educational-resources/:id',
          component: ResourceDetailPage,
          name: 'ResourceDetailPage',
        },
        {
          path: '/chatbot',
          component: ChatbotMainPage,
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
