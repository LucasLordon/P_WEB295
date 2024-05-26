import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import SearchBookView from '../views/SearchBookView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/search-book',
      name: 'search-book',
      component: SearchBookView
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
