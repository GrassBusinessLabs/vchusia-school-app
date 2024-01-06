<template>
  <div class="crop-image-dialog">
    <v-bottom-sheet v-model="showCropper" max-width="500" persistent>
      <v-card class="pt-6 pb-3">
        <v-card-text class="pb-3">
          <vue-cropper
            ref="cropper"
            class="image-container"
            :aspect-ratio="1 / 1"
            :guides="true"
            :background="false"
            :view-mode="3"
            drag-mode="move"
            :src="chosenImage"
            alt="Image not available"
          >
          </vue-cropper>
        </v-card-text>
        <v-card-actions class="py-0 mx-10">
          <v-btn
            @click="resetCropper"
            text color="red"
          > Відмінити </v-btn>
          <v-spacer></v-spacer>
          <v-btn 
            @click="cropChosenImage"
            text color="blue"
          > Готово </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import {solution} from "@/stores/solution";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";

export default {
    name: "ImageCropperDialog",
    components: {
        VueCropper,
      VBottomSheet
    },
    props: {
        chosenImage: {
            default: null,
        },
    },
    data () {
        return {
            showCropper: false,
            imageFileType: null,
            SolutionStore: solution()
        }
    },
    methods: {
        async initCropper(imageFileType) {
            this.showCropper = true;
            this.imageFileType = imageFileType;
            await new Promise(resolve => setTimeout(resolve, 50));
            this.$refs.cropper.replace(this.chosenImage);
        },

        async resetCropper(){
          this.$emit('onReset');
          this.showCropper = false;
        },

        async cropChosenImage(){
          const canvas = this.$refs.cropper.getCroppedCanvas();
          const dataURL = canvas.toDataURL(this.imageFileType);
          const blob = await fetch(dataURL).then(res => res.blob());
          const croppedFile = new File([blob], `cropped_image.${this.imageFileType.split('/')[1]}`);
          this.SolutionStore.file = croppedFile
          console.log(croppedFile)
            this.$emit('onCrop', this.$refs.cropper.getCroppedCanvas().toDataURL(this.imageFileType));
            this.resetCropper();
        },
    },
}
</script>

<style>
.image-container {
  max-width: 450px;
}

.image-container img {
  /* This is important */
  width: 100%;
}
</style>