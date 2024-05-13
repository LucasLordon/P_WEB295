import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateAccount from '../components/CreateAccount.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CreateAccount',
      component: CreateAccount
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/publishBooks',
      name: 'PublishABook',
      component: ()=> import('../views/PublishABook.vue')
    },
    {
      path: '/DetailOfBooks',
      name: 'DetailOfBooks',
      component: ()=> import('../components/DetailOfBooks.vue')
    }
  ]
})

export default router
