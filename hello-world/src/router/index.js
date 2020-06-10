import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueExp from '@/components/VueExp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'VueExp',
      component: VueExp
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
