import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import VueAxios from 'vue-axios'
import router from './router'

loadFonts()

createApp(App)
  .use(vuetify)
  .use(router)
  .use(VueAxios)
  .mount('#app')


