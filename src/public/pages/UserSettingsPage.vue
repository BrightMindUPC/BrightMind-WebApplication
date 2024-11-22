<script setup>
import { ref, onMounted } from 'vue'
import { getUserById, updateUser } from '@/services/userService'
import { sendNotification } from '@/services/notificationService'

// Enum de grados con traducción al español
const grades = {
  FIRST_YEAR: 'Primer Año',
  SECOND_YEAR: 'Segundo Año',
  THIRD_YEAR: 'Tercer Año',
  FOURTH_YEAR: 'Cuarto Año',
  FIFTH_YEAR: 'Quinto Año',
}

// Datos del usuario
const user = ref({
  username: '',
  email: '',
  grade: 'FIRST_YEAR',
  password: '',
})

// Estado para la notificación
const notification = ref({
  show: false,
  message: '',
})

// Cargar los datos del usuario al montar el componente
onMounted(async () => {
  const userId = JSON.parse(localStorage.getItem('userData')).id
  const userData = await getUserById(userId)
  user.value = userData
})

// Actualizar información del usuario
const updateUserInfo = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem('userData')).id

    // Construir el payload con los valores estáticos
    const payload = {
      ...user.value, // Datos editables por el usuario
      role: 'STUDENT', // Valores estáticos
      subject: 'MATH',
      department: 'HR',
    }

    // Actualizar el usuario
    await updateUser(userId, payload)

    // Enviar notificación de éxito
    await sendNotification({
      userId: userId,
      message: 'Tu información se actualizó exitosamente.',
    })

    // Mostrar notificación flotante
    notification.value = {
      show: true,
      message: '¡Los cambios se guardaron correctamente!',
    }

    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      notification.value.show = false
    }, 3000)
  } catch (error) {
    console.error('Error al actualizar el usuario:', error)
    notification.value = {
      show: true,
      message: 'Hubo un problema al guardar los cambios.',
    }
    setTimeout(() => {
      notification.value.show = false
    }, 3000)
  }
}
</script>

<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6">Configuración del Usuario</h1>
    <form @submit.prevent="updateUserInfo" class="space-y-4 bg-white p-6 rounded-md shadow-md">
      <div>
        <label for="username" class="block font-medium">Nombre de usuario:</label>
        <input
          id="username"
          v-model="user.username"
          type="text"
          class="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label for="email" class="block font-medium">Correo electrónico:</label>
        <input
          id="email"
          v-model="user.email"
          type="email"
          class="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>
      <div>
        <label for="grade" class="block font-medium">Grado académico:</label>
        <select
          id="grade"
          v-model="user.grade"
          class="mt-1 w-full px-4 py-2 border rounded-md"
        >
          <option v-for="(label, value) in grades" :key="value" :value="value">
            {{ label }}
          </option>
        </select>
      </div>
      <div>
        <label for="password" class="block font-medium">Contraseña:</label>
        <input
          id="password"
          v-model="user.password"
          type="password"
          placeholder="******"
          class="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Guardar Cambios
      </button>
    </form>
    <!-- Notificación flotante -->
    <div v-if="notification.show" class="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md">
      {{ notification.message }}
    </div>
  </div>
</template>
