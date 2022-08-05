<template>
  <ion-modal
    ref="modal"
    :trigger="trigger"
    :initial-breakpoint="0.5"
    :breakpoints="[0, 0.25, 0.5, 0.75]"
  >
    <ion-content class="ion-padding">
      <ion-row class="ion-justify-content-center">
        <h1 class="title">{{title}}</h1>
      </ion-row>
      <ion-list class="ion-padding" v-if="multipleSelect">
        <ion-item color="light" v-for="user in users" :key="user">
          <ion-label>{{user.name}}</ion-label>
          <ion-checkbox
            slot="start"
            :value="user.isChecked"
            @click="user.isChecked = !user.isChecked"
          ></ion-checkbox>
        </ion-item>
      </ion-list>
      <ion-list class="ion-padding" v-else>
        <ion-radio-group v-model="selectedUserId">
          <ion-item color="light" v-for="user in users" :key="user">
            <ion-label>{{user.name}}</ion-label>
            <ion-radio slot="start" :value="user.name"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
      <ion-row class="ion-justify-content-center">
        <ion-button @click="select" shape="round" color="success">Pronto</ion-button>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>
<script>
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
  mounted() {
    this.users = [
      {
        name: "Hudson",
        isChecked: false,
      },
      {
        name: "Gaby",
        isChecked: false,
      },
      {
        name: "Emilly",
        isChecked: false,
      },
    ];
  },
  methods: {
    select() {
      if (this.multipleSelect) {
        this.onSelect(this.users.filter((u) => u.isChecked));
      } else {
        //TODO - TROCAR POR ID
        this.onSelect(this.users.find((u) => u.name == this.selectedUserId));
      }
      this.$refs.modal.$el.dismiss();
    },
  },
};
</script>
<style>
.title {
  font-size: 1.2rem;
}
</style>