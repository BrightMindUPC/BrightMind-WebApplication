<template>
  <div v-if="notifications.length > 0" class="fixed bottom-5 right-5 space-y-4">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="bg-white shadow-lg rounded p-4 max-w-sm"
    >
      <p>{{ notification.message }}</p>
      <button
        class="mt-2 text-blue-500 text-sm"
        @click="dismissNotification(notification.id)"
      >
        Marcar como leída
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchNotifications, markAsRead } from '../../services/notificationService';

export default {
  name: 'FloatingNotifications',
  setup() {
    const notifications = ref([]);

    const loadNotifications = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('userData'))?.id || 1;
        notifications.value = await fetchNotifications(userId);
      } catch (error) {
        console.error('Error al cargar las notificaciones:', error);
      }
    };

    const dismissNotification = async (id) => {
      try {
        await markAsRead(id);
        notifications.value = notifications.value.filter(
          (notification) => notification.id !== id
        );
      } catch (error) {
        console.error('Error al marcar la notificación como leída:', error);
      }
    };

    onMounted(() => {
      loadNotifications();
    });

    return {
      notifications,
      dismissNotification,
    };
  },
};
</script>
