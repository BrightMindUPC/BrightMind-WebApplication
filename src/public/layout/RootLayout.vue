<script setup>
import AsideMenu from '../components/AsideMenu.vue'
</script>

<template>
  <main class="flex w-full h-screen">
    <div class="shrink-0 bg-[#272727] text-white p-6 flex flex-col">
      <AsideMenu />
    </div>
    <div class="w-full h-full p-6 bg-white text-gray-700">
      <router-view></router-view>
    </div>
  </main>
</template>
