<template>
    <div class="p-8 bg-gray-100 min-h-screen">
      <h1 class="text-2xl font-bold mb-6">Mis Notificaciones</h1>
      <div v-if="notifications.length > 0" class="space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
        >
          <p>{{ notification.message }}</p>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            @click="markNotificationAsRead(notification.id)"
          >
            Marcar como leída
          </button>
        </div>
      </div>
      <div v-else>
        <p>No tienes notificaciones en este momento.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { fetchNotifications, markAsRead } from '@/services/notificationService'
  
  const notifications = ref([])
  
  const loadNotifications = async () => {
    const userId = JSON.parse(localStorage.getItem('userData')).id
    notifications.value = await fetchNotifications(userId)
  }
  
  const markNotificationAsRead = async (id) => {
    await markAsRead(id)
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }
  
  onMounted(() => {
    loadNotifications()
  })
  </script>
  
  <style scoped>
  /* Opcional: Estilos para la página */
  </style>
  