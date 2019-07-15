import Vue from 'vue';
import Router from 'vue-router';

import StartGame from "@/components/games/StartGame.vue";
import GameSession from "@/components/games/GameSession.vue"

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/play',
      name: 'play',
      component: StartGame,
    },
    {
      path: "/play/:gameId",
      name: "play-session",
      component: GameSession,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
