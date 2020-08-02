import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Message from '../views/Message.vue'
import Work from '../views/Work.vue'
import Detail from '../views/Detail.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/work',
    name: 'Work',
    component: Work
  },
  {
    path: "/:id",
    name: "Detail",
    component: Detail
  }
]

const router = new VueRouter({
  routes
})

export default router
