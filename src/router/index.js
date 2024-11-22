import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPage from '../public/pages/NotFoundPage.vue'
import ExamplePage from '../public/pages/ExamplePage.vue'
import RootLayout from '../public/layout/RootLayout.vue'
import ResourceDetailPage from '../resources/pages/ResourceDetailPage.vue'
import ChatbotMainPage from '../chatbot-search/pages/ChatbotMainPage.vue'
import EducationalResources from '../public/pages/EducationalResources.vue'
import LoginPage from '../login-register/pages/LoginPage.vue'
import RegisterPage from '../login-register/pages/RegisterPage.vue'
import NotificationsPage from '../public/pages/NotificationsPage.vue'
import UserSettingsPage from '../public/pages/UserSettingsPage.vue'
import PlanesEstudioPage from '../public/pages/PlanesEstudioPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LoginPage, // Directamente renderizamos LoginPage en "/"
    },
    {
      path: '/register',
      component: RegisterPage,
    },
    {
      path: '/main',
      component: RootLayout,
      children: [
        {
          path: '/notifications',
          component: NotificationsPage,
        },
        {
          path: '/planes-de-estudio',
          name: 'PlanesEstudio',
          component: PlanesEstudioPage, // Asocia la ruta con el componente
        },
        {
          path: '/user-settings',
          name: 'UserSettingsPage',
          component: UserSettingsPage,
        },        
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
