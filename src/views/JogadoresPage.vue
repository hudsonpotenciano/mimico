<template>
  <ion-page>
    <ComponentBase :isDefaultFooter="'true'" :pageDefaultBackLink="'Home'" :pageTitle="'Jogadores'">
      <ion-list>
        <ItemRipple
          :title="'Hudson'"
          :src="'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'"
        ></ItemRipple>
        <ItemRipple :icon="'add-outline'" :title="'Adicionar'"></ItemRipple>
      </ion-list>
    </ComponentBase>
  </ion-page>
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
