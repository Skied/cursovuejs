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
      children: [
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/login.component.vue'),
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
