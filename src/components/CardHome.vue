<template>
  <ion-button :router-link="page" color="primary" class="card">
    <div class="flex-card">
      <!-- <ion-avatar slot="start">
        <img :src="'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y'" />
      </ion-avatar>-->
      <ion-label>
        <h2>{{title}}</h2>
      </ion-label>
    </div>
  </ion-button>
</template>

<script>
export default {
  name: "CardHome",
  data() {
    return {};
  },
  props: {
    title: {
      Type: String,
    },
    aditionalClasses: {
      Type: String,
    },
    page: {
      Type: String,
    },
    src: {
      Type: String,
    },
  },
};
</script>
<style scoped>
.card {
  height: 80px;
  width: 100%;
  background-color: var(--ion-color-primary);
  box-shadow: var(--custom-boxshadow);
  border-radius: var(--custom-border-radius);
}
.double-card {
  height: 100%;
}
.flex-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  flex: 1;
}
ion-label h2 {
  /* margin-left: 10px; */
  font-size: 20px;
}
</style>