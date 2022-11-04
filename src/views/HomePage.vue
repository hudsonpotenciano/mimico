<template>
  <ion-page class="page">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="end"> teste </ion-buttons>
      </ion-toolbar>
    </ion-header>
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
          <ion-col><h1>Categorias</h1></ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12" v-for="(categoria, index) in categorias" :key="index">
            <CardHome
              :page="'Play/' + categoria.key"
              :title="categoria.descricao"
            ></CardHome>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <p>versão 1.1</p>
      <ion-button color="primary" @click="limpeTudo">
        <ion-label>Reset Data</ion-label>
      </ion-button>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import { Categoria } from "@/entity/Categoria";
import { getTodasCategorias } from "@/storage/categorias.service";
import { IonContent, IonPage } from "@ionic/vue";
import { defineComponent } from "vue";
import CardHome from "../components/CardHome.vue";

export default defineComponent({
  name: "HomePage",
  data() {
    return {
      categorias: [] as Categoria[],
    };
  },
  async beforeCreate() {
    this.categorias = await getTodasCategorias();
  },
  methods: {
    limpeTudo() {
      localStorage.clear();
    },
  },
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
