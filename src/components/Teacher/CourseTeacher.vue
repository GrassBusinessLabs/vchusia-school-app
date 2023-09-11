<template>
  <ion-header>
    <ion-item>
      <ion-input
          type="search"
          placeholder="Пошук по курсах">
      </ion-input>
    </ion-item>

  </ion-header>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonHeader,
  IonInput,
    IonItem,
} from "@ionic/vue";

export default defineComponent({
  name: 'CourseTeacher',
  components: {
    IonHeader,
    IonInput,
    IonItem,
  }

})

</script>

<style scoped>

</style>