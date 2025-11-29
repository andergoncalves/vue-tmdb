import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/movie/:id",
      name: "movie-details",
      component: () => import("../pages/MovieDetails.vue"),
    },
  ],
});

export { router };
