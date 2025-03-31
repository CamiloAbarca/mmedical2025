import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import EquiposView from '@/views/EquiposView.vue'
import ClientesView from '@/views/ClientesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: DashboardView
  },

  {
    path: '/equipos',
    name: 'equipos',
    component: EquiposView
  },

  {
    path: '/clientes',
    name: 'clientes',
    component: ClientesView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
