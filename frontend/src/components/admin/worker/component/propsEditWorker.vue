<template>
    <div>
        <n-button @click="showModal = true">
    Start me up
  </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="Modal"
    :bordered="false"
    size="huge"
    :segmented="segmented"
  >
    <template #header-extra>
      Oops!
    </template>
    Content
    <template #footer>
      Footer
    </template>
  </n-modal>
    </div>
</template>

<script setup>
import {defineProps, watchEffect, ref, watch} from "vue";
const props = defineProps({
    id : Number
});

watch(props,(props, old)=>{
const {id} = props;
    console.log(id)
});


let bodyStyle =  {
        width: "600px"
      },
      segmented = {
        content: "soft",
        footer: "soft"
      },
      showModal = ref(false)
    



console.log(props.id);

</script>

<style lang="scss" scoped>

</style>