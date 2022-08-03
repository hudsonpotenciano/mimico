<template>
  <ion-page>
    <ComponentBase
      :isDefaultFooter="'true'"
      :pageDefaultBackLink="'Grupos'"
      :pageTitle="'Novo Grupo'"
    ></ComponentBase>
  </ion-page>
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
