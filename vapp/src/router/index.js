import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


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
    path: '/tasks',
    name: 'Tasks',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tasks.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: "/admin/tasks",
    name: "AdminTasks",
    component: () => import('../views/admin/Tasks.vue')
  },
  {
    path: "/admin/manage",
    name: "AdminManage",
    component: () => import('../views/admin/Manage.vue')
  },
  {
    path: "/admin/invite",
    name: "AdminInvite",
    component: () => import('../views/admin/Invite.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue')
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('../views/Work.vue')
  },
  {
    path: "/invite",
    name: "Invite",
    component: () => import('../views/Invite.vue')
  },
  {
    path: "/tasks/:id",
    name: "Detail",
    component: () => import('../views/Detail.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
