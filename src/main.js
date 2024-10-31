import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Aura from '@primevue/themes/aura'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, {
  theme: { preset: Aura },
})

app.use(router)

app.component('Button', Button)
app.mount('#app')
