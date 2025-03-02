<template>
  <div>
    <iframe :src="frameSrc" frameborder="0" style="width: 100%; height: 100%; overflow: hidden;"></iframe>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  frameSrc:{
    type:String,
    required:true
  }
})

</script>

<style>

</style>