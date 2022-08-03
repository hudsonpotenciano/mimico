<template>
  <ion-page>
    <ComponentBase :isDefaultFooter="'true'" :pageDefaultBackLink="'Home'" :pageTitle="'Grupos'">
      <ion-list>
        <ItemRipple :title="'Grupo 1'"></ItemRipple>
        <ItemRipple :link="'NovoGrupo'" :icon="'add-outline'" :title="'Adicionar'"></ItemRipple>
      </ion-list>
    </ComponentBase>
  </ion-page>
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
