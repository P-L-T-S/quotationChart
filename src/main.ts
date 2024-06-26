import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'

import App from './App.vue'

const app = createApp(App)
app.use(PrimeVue)

app.use(createPinia())

app.mount('#app')
