import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import store from "@/state/store";

import StartGame from "@/components/games/StartGame.vue";
import JoinGame from "@/components/games/JoinGame.vue";
import GameTable from "@/components/games/GameTable.vue";
import ErrorPage from "@/components/shared/ErrorPage.vue";

Vue.use(Router);

const router = new Router({
  // mode: 'history', (does not work on Azure BLOB hosting)
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/play",
      name: "play",
      meta: { title: "Shall we play a game?" },
      component: StartGame,
      beforeResolve(to, from, next) {
        const game = store.getters["games/activeSession"];

        if (game && game.id && game.dealerToken) {
          next({ name: "host-session", params: { gameId: game.id } });
        }
        if (game && game.id && !game.dealerToken) {
          next({ name: "join-session", params: { gameId: game.id } });
        }

        next();
      }
    },
    {
      path: "/play/:gameId",
      alias: ["/join/:gameId"],
      name: "join-session",
      component: JoinGame,
      meta: { title: "Join a game" },
      props: route => ({ gameId: route.params.gameId })
    },
    {
      path: "/join",
      meta: { title: "Join a game" },
      component: JoinGame
    },
    {
      path: "/table/:gameId",
      name: "host-session",
      meta: { title: "Welcome at the table" },
      component: GameTable,
      props: route => ({ gameId: route.params.gameId }),
      beforeResolve(to, from, next) {
        if (to.params.gameId !== store.getters["games/activeGameId"]) {
          next({ name: "join-session", params: { gameId: to.params.gameId } });
        }

        next();
      }
    },
    {
      path: "/error",
      name: "error",
      meta: { title: "Oops! An error occured" },
      component: ErrorPage
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ]
});

router.beforeEach((routeTo, routeFrom, next) => {
  // If this isn't an initial page load...
  if (routeFrom.name !== null) {
    // Start the route progress bar.
    NProgress.start();
  }

  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();

  return next();
  // If auth is required and the user is logged in...
  // if (store.getters["auth/loggedIn"]) {
  //   // Validate the local user token...
  //   return store.dispatch("auth/validate").then(validUser => {
  //     // Then continue if the token still represents a valid user,
  //     // otherwise redirect to login.
  //     validUser ? next() : redirectToLogin();
  //   });
});

// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
