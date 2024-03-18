import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import { freeSet } from '@coreui/icons'
import axios from 'axios'

axios.defaults.baseURL = 'https://www.ryanbits.ir/api/v1/'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('iconss', icons)
app.provide('icons', freeSet)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
