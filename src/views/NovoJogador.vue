<template>
  <ComponentBase
    :isDefaultFooter="false"
    :pageDefaultBackLink="'Jogadores'"
    :pageTitle="'Novo Jogador'"
  >
    <ion-list class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nome do Jogador</ion-label>
        <ion-input v-model="nome" type="text"></ion-input>
      </ion-item>
    </ion-list>
    <template #footer>
      <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col size="6" class="ion-align-self-end">
              <ion-button
                ref="botaoVoltar"
                color="button-round"
                :router-link="'Jogadores'"
                expand="full"
              >
                <ion-label>Voltar</ion-label>
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button
                @click="salveNovoJogador"
                class="button-round"
                color="success"
                expand="full"
              >
                <ion-label>Salvar</ion-label>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-footer>
    </template>
  </ComponentBase>
</template>

<script lang="ts">
import { Jogador } from "@/storage/types/jogador";
import { defineComponent } from "vue";
import { setJogador } from "../storage/jogadores-storage-service";

export default defineComponent({
  name: "NovoGrupo",
  data() {
    return {
      nome: "",
    };
  },
  components: {},
  methods: {
    salveNovoJogador() {
      setJogador(new Jogador(this.nome, 0));
      window.history.back();
    },
  },
});
</script>

<style lang="css">
</style>
