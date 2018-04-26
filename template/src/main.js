{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'

{{#router}}
import router from './router'
{{/router}}

{{#aym}}
import aymUI from 'aym-ui'
import 'aym-ui/lib/index.css'
import { install as Global } from './global'
import store from '@/store'
Vue.use(aymUI)
Vue.use(Global)
{{/aym}}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#aym}}
  store,
  {{/aym}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
