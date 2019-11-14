import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/views/home/home.component.vue';
import router from '@/router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeComponent,
      redirect: '/users',
      beforeEnter: (to: any, from: any, next: any) => {
        const token = localStorage.getItem('token');
        if (token && token.length) {
          next();
        } else {
          next('/login');
        }
      },
      children: [
        {
          path: 'users',
          name: 'users',
          component: () => import('./views/users/users.component.vue'),
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: () => import('./views/rooms/rooms.component.vue'),
        },
        {
          path: '/chat/:userId',
          name: 'chat',
          component: () => import('./views/chat/chat.component.vue')
        },
      ],
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register/register.component.vue'),
      beforeEnter: (to: any, from: any, next: any) => {
        const token = localStorage.getItem('token');
        if (token && token.length) {
          next('/');
        } else {
          next();
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.component.vue'),
      beforeEnter: (to: any, from: any, next: any) => {
        const token: string | null = localStorage.getItem('token');
        if (token && token.length) {
          next('/');
        }
        next();
      }
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
