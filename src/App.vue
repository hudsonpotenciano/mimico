<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBbcBbDPpFWz4BqF6JPrZa50nb7r-8f5m4",
  authDomain: "mimico-firebase.firebaseapp.com",
  databaseURL: "https://mimico-firebase-default-rtdb.firebaseio.com",
  projectId: "mimico-firebase",
  storageBucket: "mimico-firebase.appspot.com",
  messagingSenderId: "700179124068",
  appId: "1:700179124068:web:2dafd4d44a23fe86abb471"
};
export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>