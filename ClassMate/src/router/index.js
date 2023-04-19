import { createRouter, createWebHistory } from "vue-router";
import QuizVue from "../views/QuizView.vue";
import HomeVue from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeVue,
    },
    {
      path: "/quiz/:id",
      name: "Quiz",
      component: QuizVue,
    },
    {
      path: "/home",
      redirect: HomeVue,
    },
  ],
});

export default router;
