<template>
  <div class="d-flex flex-column justify-center align-center fill-height w-100">


    <input
        ref="filePickerField"
        type="file" accept="image/*"
        @change="launchCropper"
        hidden
    />

    <ion-buttons class="changeAvatar">
      <ion-button @click="$refs.filePickerField.click()">Змінити аватар</ion-button>
    </ion-buttons>
<!--    <v-btn class="mt-5 btn-upload" color="blue"-->
<!--           @click="$refs.filePickerField.click()"-->
<!--    > Завантажити фото </v-btn>-->

    <cropper-avatar
        ref="cropperDialog"
        :chosenImage="chosenImage"
        @onReset="$refs.filePickerField.value = null"
        @onCrop="(croppedImage) => {
          gallery.push(croppedImage);
        }"
    />
  </div>
</template>

<script>
import CropperAvatar from './CropperAvatar.vue';
import {auth} from "@/stores/auth.ts";
import {IonButton, IonButtons} from "@ionic/vue";
export default {
  name: 'InputAvatarDialog',
  components: {
    IonButton, IonButtons,
    CropperAvatar,
  },
  data() {
    return {
      avatarImage: null,
      chosenImage: null,
      gallery: [],
      authStore: auth(),
      urlData: 'https://vchusia.grassbusinesslabs.tk/static/'
    }
  },
  methods: {
    async launchCropper(event) {
      if (!event) return;
      var file = event.target.files[0];
      this.chosenImage = await this.toBase64(file);
      this.$refs.cropperDialog.initCropper(file.type);
    },

    async toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },


  }
}
</script>

