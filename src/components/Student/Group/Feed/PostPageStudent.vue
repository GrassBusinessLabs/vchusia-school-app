<script setup lang="ts">
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
import {solution} from "@/stores/solution";
import {post} from "@/stores/post"
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {onMounted, reactive, ref} from "vue";
import {SaveSolution, UpdateSolution} from "@/models/Solution";

const PostStore = post()
const SolutionStore = solution()
const check = ref(false)

let descriptionSolution: SaveSolution = reactive({
  description: ''
})

const errorHandle = () => {
  SolutionStore.findSolutionBySharedPostId(PostStore.info.sharedPostId).then((res) => {
    if(res === true) {
      check.value = true
      descriptionSolution.description = SolutionStore.solutionInfo.description
    } else{
      check.value = false
    }
  })
}

errorHandle()


const checkSolutionAndSave = () => {
    if(check.value === true){
      updateSolution()
    } else{
      saveSolution()
    }
}

const updateStatus = () => {
  SolutionStore.updateStatus(SolutionStore.solutionInfo.id)
}
const updateSolution = () => {
  SolutionStore.updateSolution(descriptionSolution, SolutionStore.solutionId)
  errorHandle()
}
const saveSolution = () => {
  SolutionStore.saveSolution(descriptionSolution)
  errorHandle()
}



</script>

<template>
<ion-page>
  <ion-content>
    <div class="container">

      <div class="infoPost">

        <div class="title_post">
          <h1>{{PostStore.info.title}}</h1>
          <p style="color:grey">Оцінка за завдання {{PostStore.info.points}}</p>
        </div>

        <div class="deadline_points">
          <p>Виконати до: {{PostStore.info.deadline}}</p>
        </div>

        <div class="description_task">
          <p>{{PostStore.info.description}}</p>
        </div>

      </div>



    </div>

  </ion-content>
  <ion-footer>
    <div class="text-center">

      <v-text-field class="description_text" @change="checkSolutionAndSave()" variant="outlined" label="Рішення" v-model="descriptionSolution.description"></v-text-field>


      <div class="pin_image">
        <CropperComponent/>
      </div>

      <div class="accept_task">
        <v-btn class="btnAcceptTask" @click="updateStatus()">
          Здати завдання
        </v-btn>
      </div>

    </div>


  </ion-footer>

</ion-page>
</template>

<style scoped>
.container{
  width: 90%;
  margin: 0 auto;
}
.title_post{
  padding: 10px 0;
  border-bottom: 1px solid black;
}
.deadline_points{
  margin: 10px 0;
  display: flex;
  font-size: 14px;
  color: grey;
}
.accept_task{
  width: 90%;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnAcceptTask{
  width: 90%;
  background: #4CAF50;
  color: #fff;
}

.pin_image{
  width: 100%;
}
.description_text{
  width: 90%;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
 }

</style>