// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import '../styles/styles.scss';
import { BootstrapVue, BIcon, BIconTrash, BIconTrash2, BIconTrash2Fill, BIconTrashFill }from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.js'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.js'



Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.component('BIcon', BIcon);
Vue.component('BIconTrash', BIconTrash);
Vue.component('BIconTrash2', BIconTrash2);
Vue.component('BIconTrash2Fill', BIconTrash2Fill);
Vue.component('BIconTrashFill', BIconTrashFill);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
