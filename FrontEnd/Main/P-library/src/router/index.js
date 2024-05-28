import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConnectToAccount from '../views/ConnectAccount.vue'
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
      path: '/connect',
      name: 'connect',
      component: ConnectToAccount
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
      path: '/DetailOfBooks/:id/',
      name: 'DetailOfBooks',
      props: true,
      component: ()=> import('../components/DetailOfBooks.vue')
    },
    {
      path: '/CreateAccount',
      name: 'CreateAccount',
      component: ()=> import('../components/CreateAccount.vue')
    }
  ]
})

export default router
