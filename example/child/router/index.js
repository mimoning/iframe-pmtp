import Vue from 'vue'
import Router from 'vue-router'
import Child from '@child/view'
import Dialog from '@child/components/dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Child',
      component: Child
    },
    {
      path: '/dialog',
      name: 'Dialog',
      component: Dialog
    }
  ]
})
