import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/usersView',
      name: 'usersView',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UsersView.vue'),
    },
    {
      path: '/assignFilm',
      name: 'assignFilm',
      component: () => import('../views/AssignFilmView.vue'),
    },
    //{
      //path: '/userFilms/:userId',
      //name: 'userFilms',
      //component: () => import('../views/UserFilmsView.vue'),
      //props: true,
    //},
    //{
      //path: '/filmUsers/:filmId',
      //name: 'filmUsers',
      //component: () => import('../views/FilmUsersView.vue'),
      //props: true,
    //},
  ],
})

export default router
