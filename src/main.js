import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueAxios from 'vue-axios'
import router from './router'
import axios from 'axios'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app')


