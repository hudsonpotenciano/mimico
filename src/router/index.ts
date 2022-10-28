import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PlayPage from "../views/PlayPage.vue";
import NovoGrupo from "../views/NovoGrupo.vue";
import GruposPage from "../views/GruposPage.vue";
import NovoJogador from "../views/NovoJogador.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/Grupos",
    name: "Grupos",
    component: GruposPage,
  },
  {
    path: "/play/:categoria",
    name: "Play",
    component: PlayPage,
  },
  {
    path: "/NovoGrupo",
    name: "NovoGrupo",
    component: NovoGrupo,
  },
  {
    path: "/NovoJogador",
    name: "NovoJogador",
    component: NovoJogador,
  },
  {
    path: "/Jogadores",
    name: "jogadores",
    component: () => import("../views/JogadoresPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
