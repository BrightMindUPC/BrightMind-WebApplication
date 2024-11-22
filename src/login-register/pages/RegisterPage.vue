<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-lg bg-white p-8 shadow-md rounded-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Ingresa tus datos personales</h1>
        <form @submit.prevent="handleRegister" class="grid grid-cols-2 gap-4">
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
          <div>
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
              <option value="HISTORY">Historia</option>
              <option value="LITERATURE">Literatura</option>
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
          <div>
            <label for="department" class="block text-sm font-medium text-gray-700">Departamento</label>
            <select
              id="department"
              v-model="formData.department"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="HR">Recursos Humanos</option>
              <option value="IT">Tecnología</option>
              <option value="FINANCE">Finanzas</option>
            </select>
          </div>
          <div class="col-span-2">
            <button
              type="submit"
              class="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Continuar
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
          department: 'HR',
        },
      };
    },
    methods: {
      async handleRegister() {
        try {
          // Construcción del payload
          const payload = {
            username: this.formData.username,
            email: this.formData.email,
            password: this.formData.password,
            role: this.formData.role,
            grade: this.formData.grade,
            subject: this.formData.subject,
            department: this.formData.department,
          };
  
          // Enviar datos al endpoint
          await axios.post('http://localhost:8080/api/users/api/users', payload);
  
          // Redirigir al login en caso de éxito
          this.$router.push('/login');
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
          alert('Hubo un error en el registro. Por favor, inténtelo de nuevo.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos personalizados opcionales */
  </style>
  