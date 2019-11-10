import Vue from 'vue';
import Router from 'vue-router';
import HomeComponent from '@/views/home/home.component.vue';
import {User} from '@/classes/user';
import store from './store';
import {Room} from '@/classes/room';

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
          path: 'chat/:idFriend',
          name: 'chat',
          props: true,
          beforeEnter: (to: any, from: any, next: any) => {
            const userId: number = parseInt(to.params.userId);
            const user: User = store.getters['usersModule/getUserById'](userId);
            if (user == null) {
              next('/users');
            } else {
              next();
            }
          },
          component: () => import('./views/chat/chat.component.vue'),
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: () => import('./views/rooms/rooms.component.vue'),
        },
        {
          path: 'room/:idRoom',
          name: 'room',
          props: true,
          beforeEnter: (to: any, from: any, next: any) => {
            const roomId: number = parseInt(to.params.roomId);
            const room: Room = store.getters['roomsModule/getRoomById'](roomId);
            if (room == null) {
              next('/rooms');
            } else {
              next();
            }
          },
          component: () => import('./views/room/room.component.vue'),
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
