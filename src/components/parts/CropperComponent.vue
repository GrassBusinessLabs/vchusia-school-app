<template>



      <input
        ref="filePickerField"
        type="file" accept="image/*"
        @change="launchCropper"
        hidden
      />

      <image-cropper-dialog
        ref="cropperDialog"
        :chosenImage="chosenImage"
        @onReset="$refs.filePickerField.value = null"
        @onCrop="(croppedImage) => {
          gallery.push(croppedImage);
        }"
      />
      <add-img class="add-img-btn" @click="$refs.filePickerField.click()"/>



  <v-bottom-sheet v-model="delImageSolution">
    <v-card title="Ви точно хочете видалити зображення?">
      <v-btn @click="deleteImage(SolutionStore.slImgId); delImageSolution = false">Так</v-btn>
      <v-btn @click="delImageSolution = false">Ні</v-btn>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import ImageCropperDialog from './ImageCropperDialog.vue';
import {solution} from "@/stores/solution.ts";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {ref} from "vue";
import {image} from "@/stores/image.ts";
import AddImg from "@/components/icons/add-img.vue";

export default {
  name: 'CropperComponent',
  components: {
    AddImg,
    ImageCropperDialog,
    VBottomSheet
  },
  data() {
    return {
      avatarImage: null,
      chosenImage: null,
      gallery: [],
      SolutionStore: solution(),
      urlData: 'https://vchusia.grassbusinesslabs.tk/static/',
      imageFromTeacher: ref(false),
      ImageStore: image(),
      delImageSolution: ref(false)
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

    async deleteImage(id){
      await this.SolutionStore.deleteImage(id)
      await this.SolutionStore.findSolutionById(this.SolutionStore.solutionId)
    }
  }
}
</script>

<style>

</style>