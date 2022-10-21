<template>
  <ComponentBase
    :isDefaultFooter="'true'"
    :pageDefaultBackLink="'Home'"
    :pageTitle="'Jogadores'"
  >
    <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list class="ion-padding">
      <ItemRipple
        v-for="jogador in jogadores"
        :key="jogador.id"
        :title="jogador.nome"
        :score="jogador.pontuacao"
      ></ItemRipple>
      <ItemRipple
        :link="'NovoJogador'"
        :icon="'add-outline'"
        :title="'Adicionar'"
      ></ItemRipple>
    </ion-list>
  </ComponentBase>
</template>

<script lang="ts">
import { Jogador } from "@/storage/types/jogador";
import { defineComponent } from "vue";
import {
  setJogador,
  getJogadorById,
  getJogadores,
} from "../storage/jogadores-storage-service";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {
      jogadores: [] as Jogador[],
    };
  },
  components: {},
  methods: {
    refresh(e: any) {
      e.target.complete();
      getJogadores();
    },
    async getJogadoresFromStorage() {
      this.jogadores = await getJogadores();
    },
  },
  async mounted() {
    await this.getJogadoresFromStorage();
  },
  updated() {
    this.getJogadoresFromStorage();
  },
});
</script>

<style lang="css"></style>
