import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import PlayPage from "../views/PlayPage.vue";
import VencedorPage from "../views/VencedorPage.vue";
import NovoGrupo from "../views/NovoGrupo.vue";
import GruposPage from "../views/GruposPage.vue";
import NovoJogador from "../views/NovoJogadorPage.vue";

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
    path: "/play/:categoria",
    name: "Play",
    component: PlayPage,
  },
  {
    path: "/vencedor/:partida",
    name: "vencedor",
    component: VencedorPage,
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
