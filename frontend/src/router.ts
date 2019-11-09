import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/views/home/home.component.vue';

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
        const token: string | null = localStorage.getItem('token');
        if (token == null) {
          next('/login');
          return;
        } else {
          next();
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
      ],
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: (to: any, from: any, next: any) => {
        const token: string | null = localStorage.getItem('token');
        if (token != null) {
          next('/');
          return;
        } else {
          next();
        }
      },
      component: () => import('./views/register/register.component.vue'),
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: (to: any, from: any, next: any) => {
        const token: string | null = localStorage.getItem('token');
        if (token != null) {
          next('/');
          return;
        } else {
          next();
        }
      },
      component: () => import('./views/login/login.component.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
