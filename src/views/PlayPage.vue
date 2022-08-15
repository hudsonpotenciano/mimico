<template>
  <ComponentBase :pageTitle="'Animais'" :isDefaultFooter="false" :pageDefaultBackLink="'../Home'">
    <TransitionGroup>
      <ion-grid v-if="!playing" class="play-grid">
        <ion-row class="view-configuracoes-jogo ion-justify-content-center ion-align-items-center">
          <ion-col size="12">
            <ion-row class="ion-justify-content-center">
              <h5>Palavras</h5>
            </ion-row>
            <div class="card-branco">
              <ion-row class="ion-justify-content-center ion-align-items-center">
                <ion-col size="3">
                  <ion-button
                    :disabled="quantidadePalavras <= 1"
                    @click="quantidadePalavras--"
                    shape="round"
                  >
                    <ion-icon name="remove-outline"></ion-icon>
                  </ion-button>
                </ion-col>
                <ion-col size="6">
                  <ion-row class="ion-justify-content-center">
                    <span>{{quantidadePalavras}} de {{categoria.palavras.length}}</span>
                  </ion-row>
                  <ion-progress-bar :value="tempoRestante / 60"></ion-progress-bar>
                </ion-col>
                <ion-col size="3" shape="round">
                  <ion-button
                    :disabled="quantidadePalavras >= categoria.palavras.length"
                    @click="quantidadePalavras++"
                    shape="round"
                  >
                    <ion-icon name="add-outline"></ion-icon>
                  </ion-button>
                </ion-col>
              </ion-row>
            </div>
          </ion-col>
          <ion-col size="12">
            <ion-row class="ion-justify-content-center">
              <h5 v-if="segment == 'todos'">Jogadores</h5>
              <h5 v-if="segment == 'grupos'">Grupos</h5>
            </ion-row>
            <div class="card-branco">
              <ion-segment v-model="segment" @ionChange="segmentChanged($event)">
                <ion-segment-button value="todos">
                  <ion-label>Cada um por si</ion-label>
                </ion-segment-button>
                <ion-segment-button value="grupos">
                  <ion-label>Em Grupos</ion-label>
                </ion-segment-button>
              </ion-segment>
              <SelectUserModal
                :onSelect="onSelectJogadores"
                :title="'Selecione Jogadores?'"
                :trigger="'modal-selectjogadores'"
                :multipleSelect="true"
              ></SelectUserModal>
              <div :class="{'d-none' : segment != 'todos'}">
                <ion-list>
                  <div class="scroll">
                    <ItemRipple
                      v-for="jogador in jogadores"
                      :key="jogador.id"
                      :title="jogador.nome"
                      :score="jogador.pontuacao"
                    ></ItemRipple>
                  </div>
                  <ItemRipple
                    id="modal-selectjogadores"
                    :icon="'add-outline'"
                    :title="'Adicionar Jogador'"
                    color="success"
                  ></ItemRipple>
                </ion-list>
              </div>

              <div :class="{'d-none' : segment != 'grupos'}">
                <ion-list v-if="segment == 'grupos'">
                  <div class="scroll">
                    <ItemRipple v-for="grupo in grupos" :key="grupo.id" :title="grupo.nome"></ItemRipple>
                  </div>

                  <ItemRipple
                    id="modal-grupos"
                    :icon="'add-outline'"
                    :title="'Adicionar Grupo'"
                    color="success"
                  ></ItemRipple>
                </ion-list>
              </div>
            </div>
          </ion-col>
          <ion-col size="12">
            <ion-grid class="ion-padding">
              <ion-row class="ion-justify-content-center ion-align-items-center row-play-button">
                <ion-button
                  :disabled="!(jogadores.length >= 2)"
                  shape="round"
                  class="play-button"
                  @click="playing = true"
                >
                  <ion-icon slot="icon-only" name="play-outline"></ion-icon>
                </ion-button>
                <ion-label class="play-label">Começar</ion-label>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid v-if="playing" class="play-grid">
        <ion-row
          v-if="playing"
          class="view-jogando ion-justify-content-center ion-align-items-center"
        >
          <ion-col size="12">
            <ion-row class="ion-justify-content-center ion-padding">
              <ion-col class="ion-text-center">
                <span>Jogador</span>
                <h1 class="jogador-name">Hudson</h1>
              </ion-col>
            </ion-row>
            <ion-row class="ion-justify-content-center ion-align-items-center">
              <ion-col size="10" class="ion-padding word-card ion-text-center">
                <ion-row class="ion-justify-content-center ion-align-items-center">
                  <ion-col size="12">
                    <h1 v-if="!palavraVisivel">
                      <span v-for="index in categoria.palavras[palavraIndex].length" :key="index">*</span>
                    </h1>
                    <h1 v-if="palavraVisivel">{{categoria.palavras[palavraIndex]}}</h1>
                  </ion-col>
                  <ion-col size="12">
                    <ion-row class="row-card-buttons">
                      <ion-col size="6">
                        <ion-button @click="palavraIndex++" class="button-rounded" color="danger">
                          <ion-icon name="refresh-outline"></ion-icon>
                        </ion-button>
                      </ion-col>
                      <ion-col size="6">
                        <ion-button class="button-rounded" color="success" @click="startTempo">
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
              <ion-label color="primary">Tempo {{tempoRestante}}</ion-label>
              <ion-progress-bar :value="tempoRestante / 60"></ion-progress-bar>
            </ion-list>
          </ion-col>
          <ion-col size="12">
            <ion-row class="ion-justify-content-center">
              <SelectUserModal
                :onSelect="onSelectAcertou"
                :title="'Quem Acertou?'"
                :trigger="'modal-acertou'"
              ></SelectUserModal>
              <ion-button id="modal-acertou" class="button-round winner-button" color="success">
                <ion-row class="ion-align-items-center">
                  <ion-col size="8">
                    <h1>Acertou</h1>
                  </ion-col>
                  <ion-col size="4">
                    <img src="../../public/assets/winner-icon.svg" alt />
                  </ion-col>
                </ion-row>
              </ion-button>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-grid>
    </TransitionGroup>
  </ComponentBase>
  <ion-modal trigger="modal-grupos" :initial-breakpoint="0.3" :breakpoints="[0, 0.3]">
    <ion-content>
      <ion-row class="ion-justify-content-center">
        <h1 class="title">Grupo</h1>
      </ion-row>

      <ion-list class="ion-padding">
        <ion-item>
          <ion-label position="floating">Nome do Grupo</ion-label>
          <ion-input v-model="nomeAddGrupo" type="text"></ion-input>
        </ion-item>
      </ion-list>
      <ion-row class="ion-padding ion-justify-content-center">
        <ion-button @click="addGrupo" shape="round" color="success">Pronto</ion-button>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { Jogador } from "@/storage/types/jogador";
import { defineComponent } from "vue";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {
      segment: "todos",
      categoria: {
        nome: "Animais",
        palavras: ["Cachorro", "Gato", "Rato"],
      },
      jogadores: [],
      grupos: [],
      nomeAddGrupo: "",
      playing: false,
      palavraIndex: 0,
      quantidadePalavras: 1,
      palavraVisivel: false,
      tempoRestante: 60,
      calcTempoRestanteInterval: 0,
    };
  },
  components: {},
  methods: {
    segmentChanged(ev: any) {
      // alert("dialogo de confirmacao para limpar jogadores e grupos");
      this.jogadores = [];
    },
    startTempo() {
      this.palavraVisivel = !this.palavraVisivel;
      clearInterval(this.calcTempoRestanteInterval);
      this.calcTempoRestanteInterval = setInterval(() => {
        this.tempoRestante--;
        if (this.tempoRestante == 0) {
          clearInterval(this.calcTempoRestanteInterval);
        }
      }, 1000);
    },
    vaParaProximaPalavra() {
      clearInterval(this.calcTempoRestanteInterval);
      this.tempoRestante = 60;
      this.palavraVisivel = false;
      this.palavraIndex++;
    },
    onSelectAcertou(user: any) {
      this.vaParaProximaPalavra();
    },
    onSelectJogadores(users: never[]) {
      this.jogadores.push(...users);
    },
    addGrupo() {
      this.grupos.push({
        nome: this.nomeAddGrupo,
      } as never);
      this.nomeAddGrupo = "";
    },
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
  color: white;
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
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  height: 0;
  opacity: 0;
}
</style>
