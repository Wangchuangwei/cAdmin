<template>
  <div class="container">
    <el-container style="height: 100%;">
      <el-header>
        <left-header></left-header>
      </el-header>
      <el-container>
        <el-aside style="width: 20%;">
          <left-menu></left-menu>
        </el-aside>
        <el-main>
          <div>
            <!-- <pdfViewVue></pdfViewVue> -->
            <analysisVue></analysisVue>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";

import LeftMenu from "./components/Menu.vue";
import LeftHeader from "./components/Header.vue";

import pdfViewVue from "@/components/pdfViewer/pdfViewer.vue";
import analysisVue from "../../pages/dashboard/analysis.vue";

(() => {
  console.log("home layout")
})
</script>

<style lang="scss" scoped>
.container {
    height: 100vh;
    width: 100%;
    background: linear-gradient(to left top, #f0f2f6, #ffffff);
    overflow: hidden;
    .el-aside {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 10px;
        padding: 10px 0 0 10px;
    }
    .el-header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 10px;
        padding: 10px 20px 0 20px;
    }
    .el-main {
        padding-top: 0;
    }
}
</style>
<style lang="scss">
.title {
    font-size: 20px; 
    font-weight: 700;
    margin-bottom: 20px;
    color: #4c5e7d;
}
.card-wrapper {
    padding: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #ffffff;
}
</style>