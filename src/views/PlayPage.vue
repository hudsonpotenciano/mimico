<template>
  <ComponentBase
    :pageTitle="'Animais'"
    :isDefaultFooter="false"
    :pageDefaultBackLink="'home'"
    :show-header="!playing"
  >
    <TransitionGroup>
      <PlayConfig
        v-if="!playing"
        :funcaoPlay="iniciePartida"
        :categoria="categoria"
      ></PlayConfig>
      <PlayGame
        v-if="playing"
        :categoria="categoria"
        :jogadores="jogadores"
        :quantidade-palavras="quantidadePalavras"
      ></PlayGame>
    </TransitionGroup>
  </ComponentBase>
</template>

<script lang="ts">
import { Jogador } from "@/storage/types/jogador";
import { defineComponent } from "vue";
import { getJogadores, setJogador } from "../storage/jogadores-storage-service";
import PlayConfig from "../components/organisms/PlayConfig.vue";
import PlayGame from "@/components/organisms/PlayGame.vue";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {
      segment: "todos",
      categoria: {
        nome: "Animais",
        palavras: ["Cachorro", "Gato", "Rato", "Macaco", "Galinh", "Pica-pau", "Porco"],
      },
      playing: false,
      jogadores: [],
      quantidadePalavras: 0,
    };
  },
  methods: {
    iniciePartida(jogadores: any, quantidadePalavras: number) {
      this.jogadores = jogadores;
      this.quantidadePalavras = quantidadePalavras;
      this.playing = true;
    },
  },
  components: { PlayConfig, PlayGame },
});
</script>

