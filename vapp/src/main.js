import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
//import drizzleVuePlugin from '@drizzle/vue-plugin'
//import drizzleOptions from './drizzleOptions'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI)
// Register the drizzleVuePlugin
//Vue.use(drizzleVuePlugin, { store, drizzleOptions })

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
