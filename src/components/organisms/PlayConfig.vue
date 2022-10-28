<template>
  <ion-grid class="play-grid">
    <ion-row
      class="view-configuracoes-jogo ion-justify-content-center ion-align-items-center"
    >
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
                <span>{{ quantidadePalavras }} de {{ categoria.palavras.length }}</span>
              </ion-row>
              <ion-progress-bar
                :value="quantidadePalavras / categoria.palavras.length"
              ></ion-progress-bar>
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
            v-if="jogadoresDb.length > 0"
            :onSelect="onSelectJogadores"
            :trigger="'modal-selectjogadores'"
            :canAddNewUser="true"
            :title="'Selecione Jogadores?'"
            :multipleSelect="true"
            :customRef="'modalselectjogadores'"
          ></SelectUserModal>
          <div :class="{ 'd-none': segment != 'todos' }">
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
                @click="checkExisteJogadores"
              ></ItemRipple>
            </ion-list>
          </div>

          <div :class="{ 'd-none': segment != 'grupos' }">
            <ion-list v-if="segment == 'grupos'">
              <ion-item>
                <ion-label>Em Breve!</ion-label>
              </ion-item>
            </ion-list>
          </div>
        </div>
      </ion-col>
      <ion-col size="12">
        <ion-grid class="ion-padding">
          <ion-row
            class="ion-justify-content-center ion-align-items-center row-play-button"
          >
            <ion-button
              :disabled="!(jogadores.length >= 2) || quantidadePalavras <= 1"
              shape="round"
              class="play-button"
              @click="iniciePartida"
            >
              <ion-icon slot="icon-only" name="play-outline"></ion-icon>
            </ion-button>
            <ion-label class="play-label">Começar</ion-label>
          </ion-row>
        </ion-grid>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import { Categoria } from "@/storage/types/categoria";
import { Jogador } from "@/storage/types/jogador";
import { defineComponent } from "vue";
import { getJogadores, setJogador } from "../../storage/jogadores-storage.service";

export default defineComponent({
  props: {
    funcaoPlay: {
      required: true,
      type: Function,
    },
    categoria: {
      required: true,
      type: Categoria,
    },
  },
  data() {
    return {
      segment: "todos",
      jogadores: [] as Jogador[],
      quantidadePalavras: 1,
      jogadoresDb: [] as Jogador[],
    };
  },
  components: {},
  methods: {
    iniciePartida() {
      this.funcaoPlay(this.jogadores, this.quantidadePalavras);
    },
    segmentChanged(ev: any) {
      // this.jogadores = [];
    },

    onSelectJogadores(users: never[]) {
      users.forEach((user: Jogador) => {
        if (!this.jogadores.find((j: Jogador) => j.id == user.id)) {
          this.jogadores.push(user as never);
        }
      });
    },
    async checkExisteJogadores() {
      if (this.jogadoresDb.length == 0) {
        this.$router.push("/novojogador");
      }
    },
  },
  async beforeMount() {
    this.quantidadePalavras = this.categoria.palavras.length;
  },
  async updated() {
    this.jogadoresDb = await getJogadores();
  },
  watch: {
    async $route(to, from) {
      //TODO REFRESH NOS USUARIOS APOS ADICIONAR

      if (from.name == "NovoJogador" && to.name == "Play") {
        this.jogadoresDb = await getJogadores();
        this.jogadores.push(this.jogadoresDb[this.jogadoresDb.length - 1]);
        setTimeout(() => {
          this.checkExisteJogadores();
        }, 1000);
      }
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
