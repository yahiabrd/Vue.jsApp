import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import store from '../store/index'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.token) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.state.token) {
    next()
    return
  }
  next('/login')
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated,
    meta: {
      title: "Login"
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: ifNotAuthenticated,
    meta: {
      title: "Register"
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: ifAuthenticated,
    meta: {
      title: "Profile"
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((toRoute, fromRoute, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Home';

  next();
})

export default router
