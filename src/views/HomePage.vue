<template>
  <ion-page class="page">
    <ion-content :fullscreen="true">
      <ion-grid class="ion-padding">
        <ion-row>
          <ion-col size="6">
            <CardHome :page="'jogadores'" :title="'Jogadores'"></CardHome>
          </ion-col>
          <ion-col size="6">
            <CardHome :page="'grupos'" :title="'Grupos'"></CardHome>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col size="6" v-for="category in categorys" :key="category.id">
            <CardHome :page="'Play/1'" :title="category.name"></CardHome>
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

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      categorys: [
        {
          id: 1,
          name: "Animais",
          imageUrl: "",
        },
        {
          id: 2,
          name: "Música",
          imageUrl: "",
        },
        {
          id: 3,
          name: "Filmes",
          imageUrl: "",
        },
      ],
    };
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
