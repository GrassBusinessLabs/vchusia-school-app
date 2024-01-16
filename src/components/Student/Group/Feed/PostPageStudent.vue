<script setup lang="ts">
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
import {solution} from "@/stores/solution";
import {post} from "@/stores/post"
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {SaveSolution, UpdateSolution} from "@/models/Solution";

const PostStore = post()
const SolutionStore = solution()
const check = ref(false)

let descriptionSolution: SaveSolution = reactive({
  description: ''
})

const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedDate;
};

function isFutureDate(targetDate: any) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const errorHandle = async () => {
  console.log(PostStore.sharedPostInfo.sharedPostId);
  try {
    const res = await SolutionStore.findSolutionBySharedPostId();

    if (res === true) {
      check.value = true;
      descriptionSolution.description = SolutionStore.solutionInfo.description;
    } else {
      check.value = false;
      await saveSolution();
    }
  } catch (error) {
    console.error('Error fetching solution:', error);
    await saveSolution();
  }
};

onMounted(() => {
  errorHandle();
})

const updateStatus = async () => {
  await SolutionStore.updateStatus(SolutionStore.solutionInfo.id);
};

const updateSolution = async () => {
  try {
    await SolutionStore.updateSolution(descriptionSolution, SolutionStore.solutionInfo.id);
    descriptionSolution.description = SolutionStore.solutionInfo.description;
    await errorHandle()
  } catch (error) {
    console.error('Error updating solution:', error);
    await saveSolution();
  }
};

const saveSolution = async () => {
  await SolutionStore.saveSolution(descriptionSolution);
  await errorHandle();
};


</script>

<template>
<ion-page>
  <ion-content>
    <div class="container">

      <div class="infoPost">

        <div class="title_post">
          <h1>{{PostStore.sharedPostInfo.title}}</h1>
          <p style="color:grey">Оцінка за завдання {{PostStore.sharedPostInfo.points}}</p>
        </div>

        <div class="deadline_points">
          <p class="missingDate" v-if="isFutureDate(PostStore.sharedPostInfo.deadline) == false">Пропущено термін здачі</p>
          <p>Виконати до {{formatDate(PostStore.sharedPostInfo.deadline)}}</p>
        </div>

        <div class="description_task">
          <p>{{PostStore.sharedPostInfo.description}}</p>
        </div>

      </div>



    </div>

  </ion-content>
  <ion-footer>
    <div class="text-center">

      <v-text-field class="description_text" @change="updateSolution" variant="outlined" label="Рішення" v-model="descriptionSolution.description"></v-text-field>


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
  flex-direction: column;
  color: grey;
}
.missingDate {
  color: red;
  font-weight: 900;
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