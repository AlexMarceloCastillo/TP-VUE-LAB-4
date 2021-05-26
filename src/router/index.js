import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ubicacion',
    name: 'Ubicacion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Ubicacion.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
    component: ()=> import('../views/Productos.vue')
  },
  {
    path: '/instrumento/:id',
    name: 'Detalle Instrumento',
    component: ()=> import('../views/DetalleInstrumento.vue')
  },
  {
    path: '/crud',
    name: 'CRUD',
    component: ()=> import('../views/Abm/Crud.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
