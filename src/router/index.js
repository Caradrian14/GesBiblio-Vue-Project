import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookForm from '../views/BookForm.vue'
import AuthorView from '../views/AuthorView.vue'
import BooksView from '../views/BooksView.vue'
import AuthorData from '../views/AuthorData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books-form',
      name: 'BookForm',
      component: BookForm
    },
    {
      path: '/edit-book/:id',
      name: 'EditProduct',
      component: BookForm,
      props: true
    },
    {
      path: '/author-list',
      name: 'AuthorView',
      component: AuthorView
    },
    {
      path: '/books-list',
      name: 'BooksView',
      component: BooksView,
    },
    {
      path: '/books-filtered/:id',
      name: 'BooksFiltered',
      component: BooksView,
      props: true
    },
    {
      path: '/author-data/:id',
      name: 'AuthorData',
      component: AuthorData,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
