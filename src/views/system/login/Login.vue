<template>
  <div class="login-container">
    <div></div>
    <div class="login-form">
      <login-form></login-form>
    </div>
  </div>
</template>

<script setup>
import LoginForm from './LoginForm.vue'
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #28404E 0%, #1c2e38 100%); 
}
.login-form {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
}
</style>