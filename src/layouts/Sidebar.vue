<template>
  <div class="h-sidebar-contain" ref="sidebarContain" :class="classObject" @mouseenter="sidebarFocus=true" @mouseleave="sidebarFocus=false">
    <div class="h-sidebar-menu">
      <el-menu class="h-sidebar-drawer-menu-container" mode="vertical">
        <sidebar-item :routes="childRoute"></sidebar-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarItem from './SidebarItem.vue'

const sidebarFocus = ref(false)

const isCollapse = computed(() => {
  return !sidebar.opened
})

const childRoute = [{
  "menuCode": "bank-scNetworkManage",
  "menuName": "核心企业管理",
  "uppMenuCode": "bank-supplyChain",
  "menuLevel": "2",
  "menuAllot": "1",
  "sortNo": "030",
  "menuId": "bank-scNetworkManage",
  "menuIcon": "mokuaihuaguanli_1_",
  "menuHerf": null,
  "menuScope": "4001",
  "menuType": "A",
  "menuKind": null,
  "menuVerify": null,
  "menuDisplay": null,
  "menuChecked": null,
  "trCode": null,
  "subsystemCode": "supplyChain",
  "folderCode": "supplyChain",
  "workflowFlag": "0",
  "workflowAssigneeMode": null,
  "iconFlag": "0",
  "isKeepAlive": "1",
  "isAdmin": "1",
  "isOperator": "1",
  "title": "核心企业管理",
  "url": null,
  "children": [
    {
      "menuCode": "bank-scNetworkMaintenance",
      "menuName": "核心企业维护",
      "uppMenuCode": "bank-scNetworkManage",
      "menuLevel": "4",
      "menuAllot": "1",
      "sortNo": "010",
      "menuId": "bank-scNetworkMaintenance",
      "menuIcon": 'mokuaihuaguanli_1_',
      "menuHerf": "/supplyChain/networkManage/networkMaintenance",
      "menuScope": "4001",
      "menuType": "A",
      "menuKind": null,
      "menuVerify": null,
      "menuDisplay": null,
      "menuChecked": null,
      "trCode": null,
      "subsystemCode": "supplyChain",
      "folderCode": "supplyChain",
      "workflowFlag": "0",
      "workflowAssigneeMode": null,
      "iconFlag": "0",
      "isKeepAlive": "1",
      "isAdmin": "1",
      "isOperator": "1",
      "title": "核心企业维护",
      "url": "/networkManage/networkMaintenance",
      "children": [],
      "_id": "36",
      "originalUrl": "/supplyChain/networkManage/networkMaintenance"
    }
  ],
  "isActived": true
}]

const classObject = computed(() => {
  return {
    'h-sidebar-focus': sidebarFocus.value == true,
    'h-sidebar-blur': sidebarFocus.value == false,
    'openedSidebar': !isCollapse
  }
})
</script>