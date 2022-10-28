<template>
  <ion-grid class="play-grid">
    <ion-row class="view-jogando ion-justify-content-center ion-align-items-center">
      <ion-col size="12">
        <ion-row class="ion-justify-content-center ion-padding">
          <ion-col class="ion-text-center">
            <span>Jogador</span>
            <h1 class="jogador-name">{{ jogadorDaVez.nome }}</h1>
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-center ion-align-items-center">
          <ion-col size="10" class="ion-padding word-card ion-text-center">
            <ion-row class="ion-justify-content-center ion-align-items-center">
              <ion-col size="12">
                <h1 v-if="!palavraVisivel">
                  <span
                    v-for="index in palavrasDaCategoria[palavraIndex]?.length"
                    :key="index"
                    >*</span
                  >
                </h1>
                <h1 v-if="palavraVisivel">{{ palavrasDaCategoria[palavraIndex] }}</h1>
              </ion-col>
              <ion-col size="12">
                <ion-row class="row-card-buttons">
                  <ion-col size="6">
                    <!-- <ion-button
                      @click="troquePalavra"
                      class="button-rounded"
                      color="danger"
                      v-if="palavraIndex < palavrasDaCategoria.length - 1"
                    >
                      <ion-icon name="refresh-outline"></ion-icon>
                    </ion-button> -->
                  </ion-col>
                  <ion-col size="12">
                    <ion-button
                      class="button-rounded"
                      color="success"
                      @click="startTempo"
                    >
                      <ion-icon v-if="!palavraVisivel" name="eye-outline"></ion-icon>
                      <ion-icon v-if="palavraVisivel" name="eye-off-outline"></ion-icon>
                    </ion-button>
                  </ion-col>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-col>
      <ion-col size="12">
        <ion-list class="ion-padding">
          <ion-label color="primary">Tempo {{ tempoRestante }}</ion-label>
          <ion-progress-bar :value="tempoRestante / 60"></ion-progress-bar>
        </ion-list>
      </ion-col>
      <ion-col size="12">
        <ion-row class="ion-justify-content-center">
          <SelectUserModal
            v-if="tempoRestante < 60"
            :onSelect="onSelectAcertou"
            :title="'Quem Acertou?'"
            :trigger="'modal-acertou'"
            :canDismissWithoutUser="false"
            :canAddNewUser="false"
            :ignore-except="jogadores"
            :ignore-id="jogadorDaVez.id"
            :customRef="'modalacertou'"
          ></SelectUserModal>
          <ion-button
            @click="clickAcertou"
            class="button-round winner-button"
            color="success"
            id="modal-acertou"
            v-if="tempoRestante < 60"
          >
            <ion-row class="ion-align-items-center">
              <ion-col size="8">
                <h1>Acertou</h1>
              </ion-col>
              <ion-col size="4">
                <img src="../../../public/assets/winner-icon.svg" />
              </ion-col>
            </ion-row>
          </ion-button>
        </ion-row>
      </ion-col>
    </ion-row>
  </ion-grid>
  <!-- //TODO - BOTÃO DE TERMINAR PARTIDA -->
</template>

<script lang="ts">
import { Categoria } from "@/storage/types/categoria";
import { Jogador } from "@/storage/types/jogador";
import { PontuacaoPartida } from "@/storage/types/PontuacaoPartida";
import { defineComponent } from "vue";
import { updateJogador } from "../../storage/jogadores-storage.service";

export default defineComponent({
  props: {
    categoria: {
      required: true,
      type: Categoria,
    },
    jogadores: {
      required: true,
      type: Object as () => Jogador[],
    },
    quantidadePalavras: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      jogadorDaVez: {} as Jogador,
      jogadorIndex: 0,
      palavraIndex: 0,
      palavraVisivel: false,
      tempoRestante: 60,
      calcTempoRestanteInterval: 0,
      palavrasDaCategoria: [] as string[],
      pontuacaoDaPartida: [] as PontuacaoPartida[],
    };
  },
  components: {},
  methods: {
    startTempo(deOndeParou = false) {
      this.palavraVisivel = !this.palavraVisivel;
      clearInterval(this.calcTempoRestanteInterval);
      this.tempoRestante = deOndeParou ? this.tempoRestante : 60;

      this.calcTempoRestanteInterval = setInterval(() => {
        this.tempoRestante--;
        if (this.tempoRestante == 0) {
          clearInterval(this.calcTempoRestanteInterval);
          //TODO TEMPO ACABOU
        }
      }, 1000);
    },
    vaParaProximaPalavra() {
      alert("teste");
      clearInterval(this.calcTempoRestanteInterval);
      this.tempoRestante = 60;
      this.palavraVisivel = false;
      this.palavraIndex++;
      this.troqueProximoJogador();
    },
    troqueProximoJogador() {
      if (!this.jogadorDaVez) {
        this.jogadorDaVez = this.jogadores[0];
        return;
      }

      if (this.jogadorIndex == this.jogadores?.length) {
        console.log(this.jogadorIndex);
        console.log(this.jogadores.length);
        this.jogadorIndex = 0;
        this.jogadorDaVez = this.jogadores[0];
        return;
      }

      this.jogadorDaVez = this.jogadores[this.jogadorIndex];
      this.jogadorIndex++;
      console.log(this.jogadorIndex);
    },
    async onSelectAcertou(jogador: Jogador) {
      debugger;
      jogador.pontuacao++;
      await updateJogador(jogador);

      this.pontuacaoDaPartida.forEach((jogadorPontuacao) => {
        if (jogadorPontuacao.idJogador == jogador.id) {
          jogadorPontuacao.pontuacao++;
        }
      });

      if (this.palavraIndex == this.quantidadePalavras) {
        //TODO - Modal Vencedor
        const vencedor = alert("");
      } else {
        this.vaParaProximaPalavra();
      }
    },
    clickAcertou() {
      clearInterval(this.calcTempoRestanteInterval);
    },
  },
  mounted() {
    this.palavrasDaCategoria = this.categoria?.palavras ?? [""];
    this.pontuacaoDaPartida = this.jogadores.map((j) => new PontuacaoPartida(j.id, 0));
    this.troqueProximoJogador();
  },
});
</script>
<style lang="scss" scoped>
.d-none {
  display: none;
}
.row-play-button {
  font-size: 1.2rem;
  flex-direction: column;
  .play-label {
    margin-top: 10px;
  }
}
.play-button {
  --border-radius: 100%;
  width: 100px;
  height: 100px;
  font-size: 2rem;

  box-shadow: var(--custom-boxshadow);
  border-radius: 100%;
}
.winner-button {
  height: auto;
  width: auto;
  box-shadow: var(--custom-boxshadow);
}
.winner-button img {
  width: 50px;
}
.winner-button h1 {
  margin: 0;
}
.play-grid {
  height: 87%;
}

.play-grid ion-row {
  height: 100%;
}
.palavra-card:hover {
  transform: rotateY(180deg);
}
.word-card {
  background-color: var(--ion-color-primary);
  border-radius: 30px;
  box-shadow: var(--custom-boxshadow);
  color: black;
}
.word-card h1 {
  font-size: 35px;
}
.jogador-name {
  font-size: 1.8rem;
  margin-top: 5px;
}
.visible {
  text-decoration: wavy;
}
.page-title {
  font-size: 2rem;
}

.scroll {
  max-height: 200px;
  overflow: auto;
}

.title {
  font-size: 1.2rem;
}
</style>
