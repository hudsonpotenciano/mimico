<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button :default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons>
        <ion-grid v-if="pageTitle">
          <ion-row v-if="alignTitleCenter" class="ion-justify-content-center">
            <h1 class="page-title">{{pageTitle}}</h1>
          </ion-row>
          <ion-row v-else>
            <h1 class="page-title page-title-padding">{{pageTitle}}</h1>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer v-if="isDefaultFooter">
      <ion-row>
        <ion-col size="2"></ion-col>
        <ion-col size="8">
          <ion-button class="button-round" expand="full" :router-link="pageDefaultBackLink">
            <ion-label>Voltar</ion-label>
          </ion-button>
        </ion-col>
        <ion-col size="2"></ion-col>
      </ion-row>
    </ion-footer>
    <slot v-else name="footer"></slot>
  </ion-page>
</template>

<script>
export default {
  name: "ComponentBase",
  props: {
    pageTitle: {
      Type: String,
    },
    alignTitleCenter: {
      Type: Boolean,
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
  font-size: 2rem;
}
.page-title-padding {
  padding-left: 20px;
}
</style>