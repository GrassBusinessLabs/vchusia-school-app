<template>
    <div class="d-flex flex-column justify-center align-center fill-height w-100">


      <input
        ref="filePickerField"
        type="file" accept="image/*"
        @change="launchCropper"
        hidden
      />

      <div class="content_image" style="width: 80%; overflow-x: scroll; white-space: nowrap;">

        <v-avatar rounded="0" size="100px" class="mt-5 mx-1 image_added" v-for="i of SolutionStore.solutionInfo.images">
          <div class="image_block">
            <div class="delete_image">
              <v-btn @click="deleteImage(i.id)" size="x-small" rounded="0" color="red" class="delete-btn"
                     icon="mdi-delete"></v-btn>
            </div>
            <div class="image_content" >
              <v-img :src="urlData+i.name"></v-img>
            </div>
          </div>
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
          gallery.push(croppedImage);
        }"
      />
    </div>
</template>

<script>
import ImageCropperDialog from './ImageCropperDialog.vue';
import {solution} from "@/stores/solution.ts";
export default {
  name: 'CropperComponent',
  components: {
    ImageCropperDialog,
  },
  data() {
    return {
      avatarImage: null,
      chosenImage: null,
      gallery: [],
      SolutionStore: solution(),
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

    async deleteImage(id){
      await this.SolutionStore.deleteImage(id)
    }
  }
}
</script>

<style>
.btn-upload{
  width: 80%;
}
.image_block{
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.image_added{
  border: 1px solid black;

}
.delete_image{
  display: flex;
  justify-content: flex-end;
}

</style>