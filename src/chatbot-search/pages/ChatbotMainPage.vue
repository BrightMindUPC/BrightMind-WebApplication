<template>
    <div class="p-8">
      <div class="text-lg font-semibold mb-2">
        Hola, {{ userName }}
      </div>
      <div class="text-gray-600 mb-6">
        ¿En qué podemos ayudarte el día de hoy?
      </div>
      <p class="text-sm text-gray-500 mb-4">
        Las recomendaciones están basadas bajo tus preferencias y objetivos seleccionados.
      </p>
  
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Button label="Aprende a solucionar matrices" icon="pi pi-calculator" class="p-button-outlined" />
        <Button label="Ayúdame con mi tarea de matemáticas" icon="pi pi-chart-bar" class="p-button-outlined" />
        <Button label="Dame un examen cinética" icon="pi pi-flask" class="p-button-outlined" />
        <Button label="Examen de Inglés A1" icon="pi pi-globe" class="p-button-outlined" />
        <Button label="Ejercicios de derivación" icon="pi pi-cog" class="p-button-outlined" />
      </div>
  
      <div class="flex">
        <InputText 
          placeholder="Escribe tu duda académica y te ayudaremos..." 
          class="w-full p-inputtext-lg"
        />
        <Button icon="pi pi-send" class="ml-2" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: 'Pepito Flores'
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  