<template>
  <ComponentBase :isDefaultFooter="'true'" :pageDefaultBackLink="'Home'" :pageTitle="'Grupos'">
    <ion-list class="ion-padding">
      <ItemRipple :title="'Grupo 1'"></ItemRipple>
      <ItemRipple :link="'NovoGrupo'" :icon="'add-outline'" :title="'Adicionar'"></ItemRipple>
    </ion-list>
  </ComponentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GruposPage",
  data() {
    return {};
  },
  components: {},
  methods: {},
});
</script>

<style lang="css">
</style>
