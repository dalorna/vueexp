import Vue from 'vue'
import Router from 'vue-router'
import Experimental from "@/components/Experimental";
// import Web from '@/views/Web/Web'
// import Home from '@/views/Web/Home'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'exp',
            component: Experimental
        }
    ]
})
