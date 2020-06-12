import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import VueExp from '@/components/VueExp'
import FormWrapper from "@/components/FormWrapper";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form',
      component: FormWrapper
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/exp',
      name: 'VueExp',
      component: VueExp
    },
  ]
})
