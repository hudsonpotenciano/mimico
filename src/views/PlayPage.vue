<template>
  <ComponentBase
    :alignTitleCenter="true"
    :isDefaultFooter="false"
    :pageDefaultBackLink="'../Home'"
    :pageTitle="'Animais'"
  >
    <ion-grid class="play-grid">
      <ion-row class="ion-justify-content-center ion-align-items-center">
        <ion-col v-if="!playing">
          <div class="ion-padding">
            <ion-segment v-model="segment">
              <ion-segment-button value="todos">
                <ion-label>Cada um por si</ion-label>
              </ion-segment-button>
              <ion-segment-button value="grupos">
                <ion-label>Em Grupos</ion-label>
              </ion-segment-button>
            </ion-segment>
            <ion-list v-if="segment == 'todos'">
              <!-- <ItemRipple
        key="1"
        :title="'Hudson'"
        :score="150"
        :src="'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'"
              ></ItemRipple>-->
              <ItemRipple :icon="'add-outline'" :title="'Adicionar Jogador'"></ItemRipple>
            </ion-list>
            <ion-list v-if="segment == 'grupos'">
              <!-- <ItemRipple key="1" :title="'Grupo 1'"></ItemRipple> -->
              <ItemRipple :icon="'add-outline'" :title="'Adicionar Grupo'"></ItemRipple>
            </ion-list>
          </div>
        </ion-col>
        <ion-col v-if="!playing">
          <ion-grid class="ion-padding">
            <ion-row class="ion-justify-content-center ion-align-items-center">
              <ion-button shape="round" class="play-button" @click="playing = true">
                <ion-icon slot="icon-only" name="play-outline"></ion-icon>
              </ion-button>
            </ion-row>
          </ion-grid>
        </ion-col>
        <ion-col size="12" v-if="playing">
          <ion-row class="ion-justify-content-center ion-padding">
            <ion-col class="ion-text-center">
              <span>Jogador</span>
              <h1 class="jogador-name">Hudson</h1>
            </ion-col>
          </ion-row>
          <ion-row class="ion-justify-content-center ion-align-items-center">
            <ion-col size="10" class="ion-padding word-card ion-text-center">
              <ion-row class="ion-justify-content-center ion-align-items-center">
                <h1>Cachorro</h1>
              </ion-row>
            </ion-col>
          </ion-row>
        </ion-col>
        <ion-col size="6" v-if="playing">
          <ion-button expand="full" color="success">Acertou</ion-button>
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
    };
  },
  components: {},
  methods: {
    segmentChanged(ev: any) {
      console.log(this.segment);
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
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 100%;
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
  height: 140px;
  background-color: var(--ion-color-primary);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  color: white;
}
.word-card h1 {
  font-size: 35px;
}
.jogador-name {
  font-size: 1.8rem;
  margin-top: 5px;
}
</style>
