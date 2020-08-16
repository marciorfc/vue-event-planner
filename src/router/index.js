import Vue from 'vue'
import VueRouter from 'vue-router'

import EventCreate from '../views/EventCreate.vue'
import EventList from '../views/EventList.vue'
import EventShow from '../views/EventShow.vue'
import NProgress from 'nprogress'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'event-list',
    component: EventList
  },
  {
    path: '/event',
    name: 'event-show',
    component: EventShow,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      console.log('route def.beforeEnter')
      store.dispatch('event/fetchEvent', routeTo.params.id).then(event => {
        routeTo.params.event = event
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    component: EventCreate
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  console.log('router.beforeEach')
  NProgress.start()
  next()
})

// eslint-disable-next-line no-unused-vars
router.afterEach(() => {
  console.log('router.afterEach')
  NProgress.done()
})

export default router
