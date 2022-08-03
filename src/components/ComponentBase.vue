<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>-->
    <ion-content>
      <h1 class="page-title">{{pageTitle}}</h1>
      <slot />
    </ion-content>
    <ion-footer v-if="isDefaultFooter">
      <ion-row>
        <ion-col size="2"></ion-col>
        <ion-col size="8">
          <ion-button style="width:100%" :router-link="pageDefaultBackLink">
            <ion-label>Voltar</ion-label>
          </ion-button>
        </ion-col>
        <ion-col size="2"></ion-col>
      </ion-row>
    </ion-footer>
  </ion-page>
</template>

<script>
export default {
  name: "ComponentBase",
  props: {
    pageTitle: {
      Type: String,
    },
    pageDefaultBackLink: {
      Type: String,
    },
    isDefaultFooter: {
      Type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.page-title {
  padding-left: 20px;
  font-size: 2rem;
}
</style>