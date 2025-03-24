<template>
  <div class="card-container w-full">
    <div class="card-header">{{ title }}</div>
    <div class="card-body">
      <div class="card-desc" v-if="desc.length > 0">{{desc}}</div>
      <div class="flex flex-wrap gap-4">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  }
})

</script>

<style lang="scss" scoped>
.card-container {
  background: #dbe9eb;
}
.card-header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  min-height: 56px;
  margin-bottom: -1px;
  padding: 0 24px;
  color: #495060;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid #9eabb9;
  border-radius: 10px 10px 0 0;
}
.card-body {
  padding: 24px;
  border-radius: 0 0 10px 10px;

  .card-desc {
    margin-bottom: 24px;
    font-size: 14px;
    color: #495060;
  }
}
</style>
