import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Profile'),
  },
  {
    path: '/quests',
    name: 'Quests page',
    component: () => import('../views/Quests'),
  },
  {
    path: '/debug',
    name: 'Debug page',
    component: () => import('../views/Debug'),
  },
]

const router = new VueRouter({
  routes
})

export default router
