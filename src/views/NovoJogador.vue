<template>
  <ComponentBase
    :isDefaultFooter="false"
    :pageDefaultBackLink="'Jogadores'"
    :pageTitle="'Novo Jogador'"
  >
    <ion-list class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nome do Jogador</ion-label>
        <ion-input autofocus required v-model="nome" type="text"></ion-input>
        <ion-text color="danger">{{ nomeErroValidacao }}</ion-text>
      </ion-item>
    </ion-list>

    <template #footer>
      <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col size="6" class="ion-align-self-end">
              <ion-button
                ref="botaoVoltar"
                class="button-round"
                @click="volte"
                expand="full"
                color="medium"
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
                type="submit"
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
  data() {
    return {
      nome: "",
      nomeErroValidacao: "",
    };
  },
  components: {},
  methods: {
    volte() {
      this.$router.back();
    },
    salveNovoJogador() {
      if (!this.isValid()) return;

      setJogador(new Jogador(this.nome, 0))
        .then(() => {
          this.volte();
        })
        .catch((error) => {
          this.nomeErroValidacao = error;
        });
    },
    isValid() {
      if (this.nome.trim() === "") {
        this.nomeErroValidacao = "Nome do jogador não foi informado";
        return false;
      }

      if (this.nome.trim().length < 5) {
        this.nomeErroValidacao = "Nome muito pequeno";
        return false;
      }
      return true;
    },
  },
});
</script>

<style lang="css"></style>
