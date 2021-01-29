import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chart from '@/components/Chart'
import Reveal from '@/components/Reveal'
import VueExp from '@/components/VueExp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/ddl',
      name: 'VueExp',
      component: VueExp
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/reveal',
      name: 'Reveal',
      component: Reveal
    },
    {
      path: '/',
      redirect: '/reveal'
    }
  ]
})
