<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white p-8 shadow-md rounded-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">BrightMind</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo/Teléfono</label>
            <input
              id="email"
              type="text"
              v-model="email"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Correo/Teléfono"
              required
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              v-model="password"
              class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="*******"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              class="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
        <p class="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?
          <router-link to="/register" class="text-purple-600 hover:underline">Sign up for BrightMind</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
      async handleLogin() {
        const apiUrl = `http://localhost:8080/api/users/email/${this.email}`;
  
        try {
          // Limpiar el localStorage antes de iniciar sesión
          localStorage.clear();
  
          // Llamada GET a la API
          const response = await axios.get(apiUrl);
  
          // Verifica si la respuesta es válida
          if (response && response.data) {
            // Guarda los datos en localStorage
            localStorage.setItem("userData", JSON.stringify(response.data));
            console.log("Datos guardados en localStorage:", response.data);
  
            // Redirige al usuario después del login
            this.$router.push("/dashboard"); // Asegúrate de tener una ruta configurada para el dashboard
          } else {
            console.error("Respuesta de la API no válida:", response);
            alert("No se pudo iniciar sesión. Verifique su información.");
          }
        } catch (error) {
          console.error("Error al llamar a la API:", error);
          alert("Hubo un error al iniciar sesión. Por favor, inténtelo de nuevo.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Personaliza estilos adicionales si es necesario */
  </style>
  