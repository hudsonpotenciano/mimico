<template>
  <ion-item :router-link="link" color="primary" class="custom-item ion-activatable ripple-parent">
    <!-- <ion-avatar v-if="src" slot="start">
      <img :src="src" />
    </ion-avatar>-->
    <ion-label>
      <ion-icon v-if="icon" :name="icon"></ion-icon>
      <h2 v-if="!icon">{{title}}</h2>
      <span v-else>{{title}}</span>
    </ion-label>
    <span v-if="score" slot="end">
      <ion-icon name="trophy-outline"></ion-icon>
      {{score}}
    </span>
    <ion-ripple-effect></ion-ripple-effect>
  </ion-item>
</template>

<script>
export default {
  name: "ItemRipple",
  data() {
    return {};
  },
  props: {
    icon: {
      Type: String,
    },
    title: {
      Type: String,
    },
    src: {
      Type: String,
    },
    score: {
      Type: String,
    },
    link: {
      Type: String,
    },
  },
};
</script>
<style scoped>
.custom-item {
  border-radius: var(--custom-border-radius);
  /* box-shadow: var(--custom-boxshadow); */
  margin: 10px;
}
ion-icon {
  vertical-align: bottom;
  margin-right: 10px;
  font-size: 1.5rem;
}
</style>