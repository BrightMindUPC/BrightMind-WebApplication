<template>
    <div class="flex flex-col h-screen">
      <!-- Greeting Section -->
      <div class="mb-4">
        <div class="text-lg font-semibold">Hola, {{ userName }}</div>
        <div class="text-gray-600">¿En qué podemos ayudarte el día de hoy?</div>
        <p class="text-sm text-gray-500 mt-2">
          Las recomendaciones están basadas bajo tus preferencias y objetivos seleccionados.
        </p>
      </div>
    
      <!-- Recommendation Buttons -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
        <Button label="Aprende a solucionar matrices" icon="pi pi-calculator" class="p-button-outlined" />
        <Button label="Ayúdame con mi tarea de matemáticas" icon="pi pi-chart-bar" class="p-button-outlined" />
        <Button label="Dame un examen cinética" icon="pi pi-flask" class="p-button-outlined" />
        <Button label="Examen de Inglés A1" icon="pi pi-globe" class="p-button-outlined" />
        <Button label="Ejercicios de derivación" icon="pi pi-cog" class="p-button-outlined" />
      </div>
    
      <!-- Chat History Section -->
      <div ref="chatContainer" class="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-md">
        <div v-for="(message, index) in messages" :key="index" class="mb-2">
          <div :class="message.isUser ? 'text-right' : 'text-left'">
            <p :class="message.isUser ? 'bg-gray-200 text-black' : 'bg-blue-100 text-blue-800'" 
               class="inline-block p-2 rounded-lg max-w-[50%] break-words">
              {{ message.text }}
            </p>
          </div>
        </div>
      </div>
    
      <!-- Input Section, Fixed to Bottom -->
      <div class="flex items-center mt-2 w-full p-4 bg-white border-t border-gray-200 sticky bottom-0">
        <InputText 
          v-model="newMessage" 
          placeholder="Escribe tu duda académica y te ayudaremos..." 
          class="w-full p-inputtext-lg"
          @keyup.enter="sendMessage"
        />
        <Button icon="pi pi-send" class="ml-2" @click="sendMessage" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: 'Pepito Flores',
        newMessage: "",
        messages: []
      };
    },
    methods: {
      sendMessage() {
        if (this.newMessage.trim() === "") return;
  
        // Add user's message to chat
        this.messages.push({ text: this.newMessage, isUser: true });
  
        // Simulate bot response
        setTimeout(() => {
          this.messages.push({ text: "Esta es una respuesta generada.", isUser: false });
          this.scrollToBottom();
        }, 500);
  
        // Clear input
        this.newMessage = "";
        this.scrollToBottom();
      },
      scrollToBottom() {
        this.$nextTick(() => {
          const container = this.$refs.chatContainer;
          container.scrollTop = container.scrollHeight;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .h-screen {
    height: 100vh;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
  }
  .sticky {
    position: sticky;
  }
  </style>
  
  