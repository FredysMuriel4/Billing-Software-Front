/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/HomeView.vue'
import Login from '../views/Auth/Login/LoginView.vue'
import Checkin from '../views/Checkin/CheckinView.vue';
import History from '../views/History/HistoryView.vue';
import InvoiceData from '../views/Checkin/InvoiceDataView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/Checkin',
    name: 'Checkin',
    component: Checkin,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/InvoiceData',
    name: 'InvoiceData',
    component: InvoiceData,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/History',
    name: 'History',
    component: History,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const checkAuth = () => {
  if (localStorage.getItem('user_token')) {
    return true;
  }
  return false;
}

const checkForbiddenRoute = (routeName) => {
  if(routeName == 'Login' && localStorage.getItem('user_token')){
    return true;
  }else if(localStorage.getItem('user_token')){
    return true;
  }
  return false;
}

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    checkAuth() ? next() : next({ path: '/login' });
    return;
  }else{
    checkForbiddenRoute(to.name) ? next({path : from.path}) : next()
  }
})
export default router
