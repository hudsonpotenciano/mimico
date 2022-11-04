<template>
  <div>
    <h1>vencedor:</h1>
    <h1>{{ vencedor?.nome }}</h1>
    <ion-button :router-link="'/home'">Voltar</ion-button>
  </div>
</template>

<script lang="ts">
import { Jogador } from "@/entity/Jogador";
import { getPartida } from "@/storage/partida.service";
import { defineComponent } from "vue";
export default defineComponent({
  name: "VencedorPage",
  data() {
    return {
      vencedor: {} as Jogador | undefined,
    };
  },
  async beforeCreate() {
    const pontuacaoDaPartida = await (await getPartida()).Pontuacao;
    const maiorPontuacao = Math.max(...pontuacaoDaPartida.map((p) => p.pontuacao));
    const pontuacao = pontuacaoDaPartida.find((p) => p.pontuacao === maiorPontuacao);
    this.vencedor = pontuacao?.Jogador;
  },
});
</script>

<style></style>
