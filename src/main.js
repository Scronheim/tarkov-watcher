import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
// import router from './router'
import TitleBar from '@wuild/vue-titlebar'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

Vue.use(TitleBar)

Vue.config.productionTip = false

Vue.use(Toast, {
  transition: 'Vue-Toastification__fade',
  maxToasts: 3,
  newestOnTop: true,
  position: 'bottom-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: false,
  draggable: true,
  draggablePercent: 0.7,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false,
})


new Vue({
  vuetify,
  store,
  // router,
  render: h => h(App)
}).$mount('#app')
