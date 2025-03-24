<template>
  <div class="pdf-viewer">
    <custIFrame :frameSrc="src"></custIFrame>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import custIFrame from '../custIFrame/index.vue'

const props = defineProps({
  file: {
    type: String,
    // required: true,
  }
})

let src = ref('/static/pdfjs/web/viewer.html?file=')

// src.value = src.value + encodeURIComponent(props.file)
src.value = src.value + encodeURIComponent('../../assets/pdf/test.pdf')

</script>

<style>

</style>