import Vue from 'vue'
import Router from 'vue-router'
import Parent from '@parent/view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Parent',
      component: Parent
    }
  ]
})
