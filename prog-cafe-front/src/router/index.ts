import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SignIn from '@/views/SignIn.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Sign in',
    component: SignIn,
  },
  {
    path: '/room/:roomId',
    name: 'Room',
    component: () => import('@/views/Room.vue'),
  },
  {
    path: '/search/',
    name: 'Search',
    component: () => import('@/views/Search.vue'),
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('@/views/UserProfile.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
