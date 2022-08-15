<template>
  <ion-modal
    ref="modal"
    :trigger="trigger"
    :initial-breakpoint="0.5"
    :breakpoints="[0, 0.25, 0.5, 0.75]"
  >
    <ion-content>
      <ion-row class="ion-justify-content-center">
        <h1 class="title">{{title}}</h1>
      </ion-row>
      <div class="scroll">
        <ion-list v-if="multipleSelect">
          <ion-item color="light" v-for="user in users" :key="user">
            <ion-label>{{user.nome}}</ion-label>
            <ion-checkbox
              slot="start"
              :value="user.isChecked"
              @click="user.isChecked = !user.isChecked"
            ></ion-checkbox>
          </ion-item>
        </ion-list>
        <ion-list v-else>
          <ion-radio-group v-model="selectedUserId">
            <ion-item color="light" v-for="user in users" :key="user">
              <ion-label>{{user.name}}</ion-label>
              <ion-radio slot="start" :value="user.nome"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </div>
      <ion-row class="ion-padding ion-justify-content-center">
        <ion-button @click="select" shape="round" color="success">Pronto</ion-button>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>
<script>
import { getJogadores } from "../storage/jogadores-storage-service";

export default {
  name: "SelectUserModal",
  data() {
    return {
      users: [],
      selectedUserId: "",
    };
  },
  props: {
    trigger: {
      Type: String,
    },
    title: {
      Type: String,
    },
    onSelect: {
      Type: Function,
    },
    multipleSelect: {
      Type: Boolean,
      default: false,
    },
  },
  async mounted() {
    this.users = await getJogadores();
  },
  methods: {
    select() {
      if (this.multipleSelect) {
        this.onSelect(this.users.filter((u) => u.isChecked));
      } else {
        //TODO - TROCAR POR ID
        this.onSelect(this.users.find((u) => u.nome == this.selectedUserId));
      }
      this.$refs.modal.$el.dismiss();
    },
  },
};
</script>
style
<style scroped>
.scroll {
  height: 30%;
  overflow: auto;
}
.title {
  font-size: 1.2rem;
}
</style>