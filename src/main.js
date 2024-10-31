import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import router from './router'

import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: {
      ...Aura,
      semantic: {
        ...Aura.semantic,
        primary: {
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
        },
      },
    },
    options: {
      darkModeSelector: false || 'none',
    },
  },
})

app.use(router)

app.component('Button', Button)
app.component('PanelMenu', PanelMenu)
app.component('InputText', InputText)
app.component('Card', Card)
app.mount('#app')
