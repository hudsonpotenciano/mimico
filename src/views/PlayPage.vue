<template>
  <ComponentBase
    :pageTitle="categoria.descricao"
    :isDefaultFooter="false"
    :pageDefaultBackLink="'home'"
    :show-header="!playing"
  >
    <TransitionGroup>
      <PlayConfig
        v-if="!playing && categoria.descricao"
        :funcaoPlay="iniciePartida"
        :categoria="categoria"
      ></PlayConfig>
      <PlayGame
        v-if="playing && categoria.descricao"
        :categoria="categoria"
        :jogadores="jogadores"
        :quantidade-palavras="quantidadePalavras"
      ></PlayGame>
    </TransitionGroup>
  </ComponentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PlayConfig from "../components/organisms/PlayConfig.vue";
import PlayGame from "@/components/organisms/PlayGame.vue";
import { getCategoria } from "@/storage/categorias-storage.service";
import { Categoria } from "@/storage/types/categoria";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {
      segment: "todos",
      categoria: {} as Categoria,
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
  async mounted() {
    let params = this.$route.params.categoria;
    debugger;
    this.categoria = await getCategoria(params as string);
  },
  components: { PlayConfig, PlayGame },
});
</script>
