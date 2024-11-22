<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 shadow-md rounded-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Ingresa tus datos personales</h1>
      <form @submit.prevent="handleRegister" class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <label for="role" class="block text-sm font-medium text-gray-700">Tipo de usuario</label>
          <select
            id="role"
            v-model="formData.role"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="STUDENT">Alumno</option>
            <option value="TEACHER">Profesor</option>
          </select>
        </div>

        <div class="col-span-2">
          <label for="username" class="block text-sm font-medium text-gray-700">Nombre completo</label>
          <input
            id="username"
            type="text"
            v-model="formData.username"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Nombre completo"
            required
          />
        </div>

        <div class="col-span-2">
          <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            v-model="formData.email"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Correo Electrónico"
            required
          />
        </div>

        <div v-if="formData.role === 'STUDENT'" class="col-span-2">
          <label for="grade" class="block text-sm font-medium text-gray-700">Grado de estudio</label>
          <select
            id="grade"
            v-model="formData.grade"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="FIRST_YEAR">Primero</option>
            <option value="SECOND_YEAR">Segundo</option>
            <option value="THIRD_YEAR">Tercero</option>
            <option value="FOURTH_YEAR">Cuarto</option>
            <option value="FIFTH_YEAR">Quinto</option>
          </select>
        </div>

        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700">Materia</label>
          <select
            id="subject"
            v-model="formData.subject"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="MATH">Matemáticas</option>
            <option value="SCIENCE">Ciencias</option>
            <option value="LITERATURE">Literatura</option>
            <option value="HISTORY">Historia</option>
            <option v-if="formData.role === 'TEACHER'" value="PHYSICS">Física</option>
            <option v-if="formData.role === 'TEACHER'" value="CHEMISTRY">Química</option>
          </select>
        </div>

        <div class="col-span-2">
          <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            id="password"
            type="password"
            v-model="formData.password"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Contraseña"
            required
          />
        </div>

        <div class="col-span-2">
          <button
            type="submit"
            class="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Continuar
          </button>
        </div>

        <!-- Botón para regresar a la página de Login -->
        <div class="col-span-2">
          <button
            type="button"
            @click="goToLogin"
            class="w-full py-2 px-4 bg-gray-500 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Regresar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        role: 'STUDENT',
        grade: 'FIRST_YEAR',
        subject: 'MATH',
      },
    };
  },
  methods: {
    async handleRegister() {
      try {
        const payload = {
          username: this.formData.username,
          email: this.formData.email,
          password: this.formData.password,
          role: this.formData.role,
          grade: this.formData.role === 'STUDENT' ? this.formData.grade : null,
          subject: this.formData.subject,
        };

        await axios.post('http://localhost:8080/api/users', payload);

        // Redirigir al RootLayout
        this.$router.push('/main');
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        alert('Hubo un error en el registro. Por favor, inténtelo de nuevo.');
      }
    },
    goToLogin() {
      // Regresar al Login
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados opcionales */
</style>
