<template>
    <div class="d-flex flex-column justify-center align-center fill-height">


      <input
        ref="filePickerField"
        type="file" accept="image/*"
        @change="launchCropper"
        hidden
      />

<!--      <div class="content_image" style="width: 80%; overflow-x: scroll; white-space: nowrap;">-->


<!--        <v-avatar rounded="0" size="100px" class="mt-5 mx-1 image_added" v-for="i of SolutionStore.nowSolution.images">-->
<!--          <img width="128" class="cover" :src="urlData+i.cover.name" alt="">-->

<!--          <div class="image_block">-->
<!--            <div class="delete_image">-->
<!--              <v-btn @click="deleteImage(i.id)" size="x-small" rounded="0" color="red" class="delete-btn"-->
<!--                     icon="mdi-delete"></v-btn>-->
<!--            </div>-->

<!--            <div class="image_content" >-->

<!--              <v-img width="100%" :src="urlData+i.name"></v-img>-->
<!--            </div>-->
<!--          </div>-->
<!--        </v-avatar>-->



<!--        <v-avatar rounded="0" size="100px" class="mt-5 mx-1 image_added" :class="{'has-dot' : i.cover.id !== 0}" v-for="i of SolutionStore.nowSolution.images" @click="imageFromTeacher = true">-->
<!--&lt;!&ndash;          <img width="128" class="cover" :src="urlData+i.cover.name" v-if='i.cover.id !== 0' >&ndash;&gt;-->
<!--          <v-btn class="position-absolute image-btn-del" size="x-small" color="red" elevation="0" @click.stop icon="mdi-delete" @click="delImageSolution = true; SolutionStore.slImgId = i.id"></v-btn>-->
<!--          <v-img width="100%" :src="urlData+i.name" @click="ImageStore.nowImageFromTeacher = i"></v-img>-->
<!--        </v-avatar>-->


<!--      </div>-->


<!--      <v-btn icon="mdi-paperclip" class="mt-5 btn-upload" color="blue"-->
<!--        @click="$refs.filePickerField.click()"-->
<!--      >  </v-btn>-->

      <image-cropper-dialog
        ref="cropperDialog"
        :chosenImage="chosenImage"
        @onReset="$refs.filePickerField.value = null"
        @onCrop="(croppedImage) => {
          gallery.push(croppedImage);
        }"
      />
      <add-img @click="$refs.filePickerField.click()"/>

    </div>

<!--  <v-bottom-sheet v-model="imageFromTeacher" fullscreen>-->
<!--    <v-card >-->
<!--      <v-btn icon="mdi-arrow-left" class="position-absolute btn-back" size="x-large" elevation="0"  @click="imageFromTeacher = false"></v-btn>-->

<!--        <img :src="urlData+ImageStore.nowImageFromTeacher.cover.name" v-if="ImageStore.nowImageFromTeacher.cover.id !== 0" class="cover-img-card">-->


<!--        <img :src="urlData+ImageStore.nowImageFromTeacher.name" class="main-img-card">-->



<!--    </v-card>-->
<!--  </v-bottom-sheet>-->

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
.btn-upload{

  width: 80%;
}

.btn-back{
  z-index: 101;
}


.image_block{
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}
.image_added{
  border: 1px solid grey;
  border-radius: 15px;
  padding: 5px;
  position: relative;

}
.delete_image{
  display: flex;
  justify-content: flex-end;
}
.cover{
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.cover-img-card{
  position: relative;
  z-index: 100;
  width: 787px;
  height: 787px;
}

.main-img-card{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.has-dot:after{
  content: '1';
  position: absolute;
  background: red;
  height: 20px;
  width: 20px;
  top: 0;
  right: 0;
  color: #fff;
  border-radius: 50%;
}

.image-btn-del{
  bottom: 0;
  right: 0;
  z-index: 110;
  padding: 0;
  color: #fff;
}
</style>