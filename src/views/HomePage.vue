<template>
  <ion-page class="page">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-padding">
        <ion-row>
          <ion-col size="6">
            <CardHome :page="'jogadores'" :title="'Jogadores'"></CardHome>
          </ion-col>
          <!-- <ion-col size="6">
            <CardHome :page="'grupos'" :title="'Grupos'"></CardHome>
          </ion-col>-->
        </ion-row>

        <ion-row>
          <ion-col size="6" v-for="categoria in categorias" :key="categoria.id">
            <CardHome :page="'Play/1'" :title="categoria.nome"></CardHome>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import CardHome from "../components/CardHome.vue";
import { setJogador } from "../storage/jogadores-storage-service";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      categorias: [
        {
          id: 1,
          nome: "Animais",
          imageUrl: "",
        },
        {
          id: 2,
          nome: "Música",
          imageUrl: "",
        },
        {
          id: 3,
          nome: "Filmes",
          imageUrl: "",
        },
      ],
    };
  },
  mounted() {
    setJogador({
      nome: "Hudson",
      pontuacao: 14,
      id: 0,
    });
  },
  methods: {},
  components: {
    IonContent,
    IonPage,
    CardHome,
  },
});
</script>

<style lang="css">
.page {
}
</style>
