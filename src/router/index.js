import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '../components/layout/Dashboard'
import Meta from '@/components/layout/Meta'
import Tableau from '@/components/Tableau'

Vue.use(Router)

export default new Router({
  // mode: 'history',
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
    },
    {
      path: '/tableau',
      name: 'tableau',
      component: Tableau
    }
  ]
})
