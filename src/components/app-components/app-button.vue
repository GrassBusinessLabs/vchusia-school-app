<script setup lang="ts">

</script>

<template>
  <div class="container-app-btn">
    <button class="btn">
      <slot></slot>
    </button>
  </div>






</template>

<style scoped>
.container-app-btn{
  display: flex;
  margin: 32px 0;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.btn{
  border-radius: 43px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 34px 16px 34px;
  height: 51px;
  width: 100%;
  box-sizing: border-box;
  color: rgb(255, 248, 237);
  font-family: "Inter Regular", sans-serif;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  text-transform: none;
  max-width: 100%;
}

</style>