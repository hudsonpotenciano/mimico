<template>
  <ComponentBase
    :alignTitleCenter="true"
    :isDefaultFooter="false"
    :pageDefaultBackLink="'../Home'"
    :pageTitle="'Animais'"
  >
    <ion-grid class="play-grid">
      <ion-row v-if="!playing" class="ion-justify-content-center ion-align-items-center">
        <ion-col size="12">
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size="3">
              <ion-button shape="round">
                <ion-icon name="remove-outline"></ion-icon>
              </ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-row class="ion-justify-content-center">
                <span>12/150</span>
              </ion-row>
              <ion-progress-bar :value="tempoRestante / 60"></ion-progress-bar>
            </ion-col>
            <ion-col size="3" shape="round">
              <ion-button shape="round">
                <ion-icon name="add-outline"></ion-icon>
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="12">
          <ion-segment v-model="segment">
            <ion-segment-button value="todos">
              <ion-label>Cada um por si</ion-label>
            </ion-segment-button>
            <ion-segment-button value="grupos">
              <ion-label>Em Grupos</ion-label>
            </ion-segment-button>
          </ion-segment>
          <ion-list class="ion-padding" v-if="segment == 'todos'">
            <!-- <ItemRipple
        key="1"
        :title="'Hudson'"
        :score="150"
        :src="'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'"
            ></ItemRipple>-->
            <ItemRipple :icon="'add-outline'" :title="'Adicionar Jogador'"></ItemRipple>
          </ion-list>
          <ion-list class="ion-padding" v-if="segment == 'grupos'">
            <!-- <ItemRipple key="1" :title="'Grupo 1'"></ItemRipple> -->
            <ItemRipple :icon="'add-outline'" :title="'Adicionar Grupo'"></ItemRipple>
          </ion-list>
        </ion-col>
        <ion-col size="12">
          <ion-grid class="ion-padding">
            <ion-row class="ion-justify-content-center ion-align-items-center">
              <ion-button shape="round" class="play-button" @click="playing = true">
                <ion-icon slot="icon-only" name="play-outline"></ion-icon>
              </ion-button>
            </ion-row>
          </ion-grid>
        </ion-col>
      </ion-row>
      <ion-row v-if="playing" class="ion-justify-content-center ion-align-items-center">
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
                  <h1 v-if="!wordVisible">
                    <span v-for="index in word.length" :key="index">*</span>
                  </h1>
                  <h1 v-if="wordVisible">{{word}}</h1>
                </ion-col>
                <ion-col size="12">
                  <ion-row class="row-card-buttons">
                    <ion-col size="6">
                      <ion-button class="button-rounded" color="danger">
                        <ion-icon name="refresh-outline"></ion-icon>
                      </ion-button>
                    </ion-col>
                    <ion-col size="6">
                      <ion-button class="button-rounded" color="success" @click="startTempo">
                        <ion-icon v-if="!wordVisible" name="eye-outline"></ion-icon>
                        <ion-icon v-if="wordVisible" name="eye-off-outline"></ion-icon>
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
  </ComponentBase>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "JogadoresPage",
  data() {
    return {
      segment: "todos",
      jogadores: [],
      grupos: [],
      playing: false,
      word: "Papagaio",
      wordVisible: false,
      tempoRestante: 60,
      calcTempoRestanteInterval: 0,
    };
  },
  components: {},
  methods: {
    segmentChanged(ev: any) {
      console.log(this.segment);
    },
    startTempo() {
      this.wordVisible = !this.wordVisible;
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
      this.wordVisible = false;
      this.word = "NOVA PALAVRA";
    },
    onSelectAcertou(user: any) {
      this.vaParaProximaPalavra();
    },
  },
});
</script>

<style lang="css">
.play-button {
  --border-radius: 100%;
  font-size: 2rem;
  width: 100px;
  height: 100px;
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
  text-decoration: ;
}
</style>
