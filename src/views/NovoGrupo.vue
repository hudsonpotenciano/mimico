<template>
  <ComponentBase :isDefaultFooter="false" :pageDefaultBackLink="'Grupos'" :pageTitle="'Novo Grupo'">
    <ion-list class="ion-padding">
      <ion-item>
        <ion-label position="floating">Nome do Grupo</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
    </ion-list>
    <ion-list>
      <ItemRipple :title="'Hudson'"></ItemRipple>
      <ItemRipple :icon="'add-outline'" :title="'Adicionar Jogador'"></ItemRipple>
    </ion-list>
    <template #footer>
      <ion-footer>
        <ion-grid>
          <ion-row>
            <ion-col size="6" class="ion-align-self-end">
              <ion-button color="button-round" :router-link="'Grupos'" expand="full">
                <ion-label>Voltar</ion-label>
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button class="button-round" color="success" expand="full">
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
