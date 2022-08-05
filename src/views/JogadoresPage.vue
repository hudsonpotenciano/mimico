<template>
  <ComponentBase :isDefaultFooter="'true'" :pageDefaultBackLink="'Home'" :pageTitle="'Jogadores'">
    <ion-list class="ion-padding">
      <ItemRipple
        :title="'Hudson'"
        :score="150"
      ></ItemRipple>
      <ItemRipple :link="'NovoJogador'" :icon="'add-outline'" :title="'Adicionar'"></ItemRipple>
    </ion-list>
  </ComponentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>

<style lang="css">
</style>
