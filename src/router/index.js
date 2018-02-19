import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/Dashboard'
import Meta from '@/components/Meta'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/meta',
      name: 'meta',
      component: Meta
    }
  ]
})
