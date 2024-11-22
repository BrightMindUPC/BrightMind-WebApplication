import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/notifications/api/notifications';

export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data.filter(notification => notification.reas === false)
  } catch (error) {
    console.error('Error al cargar las notificaciones:', error);
    return [];
  }
};

export const markAsRead = async (notificationId) => {
  try {
    await axios.put(`${BASE_URL}/${notificationId}/mark-as-read`);
  } catch (error) {
    console.error('Error al marcar la notificación como leída:', error);
  }
};

export const sendNotification = async (notificationData) => {
  await axios.post(BASE_URL, notificationData)
}