<template>
  <ion-modal
    ref="modal"
    :trigger="trigger"
    :initial-breakpoint="0.5"
    :breakpoints="[0, 0.5, 0.75]"
    :can-dismiss="checkDismiss"
  >
    <ion-content>
      <ion-row class="ion-justify-content-center">
        <h1 class="title">{{title}}</h1>
      </ion-row>
      <div class="scroll">
        <ion-list v-if="multipleSelect">
          <ion-item color="light" v-for="user in users" :key="user.id">
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
            <ion-item color="light" v-for="user in users" :key="user.id">
              <ion-label>{{user.nome}}</ion-label>
              <ion-radio slot="start" :value="user.id"></ion-radio>
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
// import { actionSheetController } from "@ionic/vue";

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
    canDismissWithoutUser: {
      Type: Boolean,
      default: true,
    },
  },
  async mounted() {
    this.users = await getJogadores();
  },
  methods: {
    select() {
      this.$refs.modal.$el.dismiss();
    },
    checkDismiss() {
      if (
        this.canDismissWithoutUser ||
        this.selectedUserId ||
        this.multipleSelect
      ) {
        if (this.multipleSelect) {
          const usersSelected = this.users.filter((u) => u.isChecked);
          if (usersSelected.length == 0) return false;

          this.onSelect(this.users.filter((u) => u.isChecked));
          return true;
        } else {
          if (!this.selectedUserId) return false;
          this.onSelect(this.users.find((u) => u.id == this.selectedUserId));
          return true;
        }
      }
      return false;
      // const actionSheet = await actionSheetController.create({
      //   header: "Realmente deseja fechar a seleção?",
      //   buttons: [
      //     {
      //       text: "Sim",
      //       role: "confirm",
      //     },
      //     {
      //       text: "Não",
      //       role: "cancel",
      //     },
      //   ],
      // });
      // actionSheet.present();
      // const { role } = await actionSheet.onWillDismiss();
      // return role === "confirm";
    },
  },
};
</script>

<style scroped>
.scroll {
  height: 30%;
  overflow: auto;
}
.title {
  font-size: 1.2rem;
}
</style>