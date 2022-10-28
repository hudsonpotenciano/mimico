<template>
  <ion-modal
    :ref="customRef"
    :key="customRef"
    :trigger="trigger"
    :initial-breakpoint="0.75"
    :breakpoints="[0, 0.75]"
  >
    <ion-content>
      <ion-row class="ion-justify-content-center">
        <h1 class="title">{{ title }}</h1>
      </ion-row>
      <div class="scroll">
        <ion-list v-if="multipleSelect">
          <ion-item color="light" v-for="user in users" :key="user.id">
            <ion-label>{{ user.nome }}</ion-label>
            <ion-checkbox
              slot="start"
              :value="user.isChecked"
              @click="user.isChecked = !user.isChecked"
            ></ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-list v-else>
          <ion-radio-group v-model="selectedUserId">
            <ion-item color="light" v-for="user in users" :key="user.id">
              <ion-label>{{ user.nome }}</ion-label>
              <ion-radio slot="start" :value="user.id"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>
      <ion-list v-if="canAddNewUser">
        <ItemRipple
          :link="'/NovoJogador'"
          :icon="'add-outline'"
          :title="'Novo jogador'"
          @click="(forceDismiss = true), modalDismiss()"
        ></ItemRipple
      ></ion-list>
      <ion-row class="ion-justify-content-center">
        <ion-button @click="modalDismiss" shape="round" color="success"
          >Pronto</ion-button
        >
      </ion-row>
    </ion-content>
  </ion-modal>
</template>
<script>
import { getJogadores } from "../storage/jogadores-storage.service";
// import { actionSheetController } from "@ionic/vue";

export default {
  name: "SelectUserModal",
  data() {
    return {
      users: [],
      selectedUserId: "",
      forceDismiss: false,
    };
  },
  props: {
    title: {
      Type: String,
    },
    customRef: {
      Type: String,
    },
    trigger: {
      Type: String,
    },
    onSelect: {
      Type: Function,
    },
    dismiss: {
      Type: Function,
    },
    multipleSelect: {
      Type: Boolean,
      default: false,
    },
    canDismissWithoutUser: {
      Type: Boolean,
      default: true,
    },
    canAddNewUser: {
      Type: Boolean,
      default: false,
    },
    ignoreId: {
      Type: Number,
      default: 0,
    },
    ignoreExcept: {
      Type: Array,
      default: [],
    },
  },
  async mounted() {
    this.getJogadoresFromDb();
  },
  methods: {
    modalDismiss() {
      if (this.onSelect) {
        console.log(this.users);
        if (this.multipleSelect) {
          this.onSelect(this.users.filter((u) => u.isChecked));
        } else {
          this.onSelect(this.users.find((u) => u.id == this.selectedUserId));
        }
      }
      this.$refs[this.customRef].$el.dismiss();
    },
    async getJogadoresFromDb() {
      this.users = await getJogadores();
      if (this.ignoreExcept.length > 0) {
        this.users = this.users.filter((f) =>
          this.ignoreExcept.find((ex) => ex.id == f.id)
        );
      }
      if (this.ignoreId > 0) {
        this.users = this.users.filter((f) => f.id != this.ignoreId);
      }
    },
  },
};
</script>

<style scroped>
.scroll {
  max-height: 270px;
  overflow: auto;
}
.title {
  font-size: 1.2rem;
}
</style>
