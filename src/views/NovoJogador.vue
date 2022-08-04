<template>
  <ComponentBase
    :isDefaultFooter="false"
    :pageDefaultBackLink="'Jogadores'"
    :pageTitle="'Novo Jogador'"
  >
    <ion-list class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nome do Jogador</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
    </ion-list>
    <template #footer>
      <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col size="6" class="ion-align-self-end">
              <ion-button :router-link="'Jogadores'" expand="full">
                <ion-label>Voltar</ion-label>
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button color="success" expand="full">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "NovoGrupo",
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>

<style lang="css">
</style>
