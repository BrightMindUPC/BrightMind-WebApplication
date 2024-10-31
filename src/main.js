import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'
import router from './router'

import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

const app = createApp(App)
app.use(PrimeVue, {
  theme: { preset: Aura },
})

app.use(router)

app.component('Button', Button)
app.component('PanelMenu', PanelMenu)
app.mount('#app')
