<script setup lang="ts">
import {IonPage, IonHeader} from "@ionic/vue";
import {group} from "@/stores/group";

const GroupStore = group()
</script>

<template>
<ion-page>
  <ion-header>
    <div class="groupActive d-flex justify-center align-center">
      <div v-for="i of GroupStore.myGroups">
        <div v-if="i.id === GroupStore.idGroup">
          <h6 class="text-center">{{i.name}}</h6>
        </div>
      </div>
    </div>
  </ion-header>
</ion-page>
</template>

<style scoped>
.groupActive{
  outline: 1px cadetblue ridge;
  margin: 15px;
  border-radius: 15px;
  padding: 15px;
  height: 30px;
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
}
</style>