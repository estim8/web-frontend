import Vue from 'vue';
import Router from 'vue-router';

import StartGame from "@/components/games/StartGame.vue";
import JoinGame from "@/components/games/JoinGame.vue";
import GameSession from "@/components/games/GameSession.vue";
import ErrorPage from "@/components/shared/ErrorPage.vue";

Vue.use(Router);

export default new Router({
  // mode: 'history', (does not work on Azure BLOB hosting)
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/play',
      name: 'play',
      meta: { title: "Shall we play a game?" },
      component: StartGame,
    },
    {
      path: "/play/:gameId",
      name: "play-session",
      component: JoinGame,
      meta: { title: "Join a game" },
      props: route => ({ gameId: route.params.gameId }),
    },
    {
      path: "/host/:gameId",
      name: "host-session",
      meta: { title: "Game in progress" },
      component: GameSession,
      props: route => ({ gameId: route.params.gameId }),
    },
    {
      path: "/error",
      name: "error",
      meta: { title: "Oops! An error occured" },
      component: ErrorPage,
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
