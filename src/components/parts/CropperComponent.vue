<template>
    <div class="d-flex flex-column justify-center align-center fill-height w-100">

      
      <input
        ref="filePickerField"
        type="file" accept="image/*"
        @change="launchCropper"
        hidden
      />

      <div>
        <v-avatar rounded="0" size="100px" class="mt-5">
          <v-img :src="avatarImage"></v-img>
        </v-avatar>
      </div>

      <v-btn class="mt-5 btn-upload" color="blue"
        @click="$refs.filePickerField.click()"
      > Завантажити фото </v-btn>

      <image-cropper-dialog
        ref="cropperDialog"
        :chosenImage="chosenImage"
        @onReset="$refs.filePickerField.value = null"
        @onCrop="(croppedImage) => {
          avatarImage = croppedImage;
        }"
      />
    </div>
</template>

<script>
import ImageCropperDialog from './ImageCropperDialog.vue';
export default {
  name: 'HomePage',
  components: {
    ImageCropperDialog,
  },
  data() {
    return {
      avatarImage: null,
      chosenImage: null,
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

<style>
.btn-upload{
  width: 80%;
}
</style>