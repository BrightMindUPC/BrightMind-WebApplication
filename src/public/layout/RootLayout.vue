<script setup>
import AsideMenu from '../components/AsideMenu.vue';
import FloatingNotifications from '../components/FloatingNotifications.vue';
</script>

<template>
  <main class="flex w-full h-screen">
    <div class="shrink-0 bg-[#272727] text-white p-6 flex flex-col">
      <AsideMenu />
    </div>
    <div class="w-full h-full py-12 px-12 bg-white text-gray-700 relative">
      <div class="max-w-6xl mx-auto">
        <router-view></router-view>
      </div>
      <FloatingNotifications />
    </div>
  </main>
</template>
