import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/layout/Dashboard'
import Meta from '@/components/layout/Meta'

Vue.use(Router)

export default new Router({
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
