<template>
  <div class="flex flex-col h-screen">
    <!-- Contenedor del chat -->
    <div ref="chatContainer" class="flex-grow overflow-y-auto bg-gray-50 p-4 rounded-md">
      <div v-for="(message, index) in messages" :key="index" class="mb-2">
        <!-- Mensajes del usuario -->
        <div v-if="message.userMessage" class="text-right">
          <p class="bg-gray-200 text-black inline-block p-2 rounded-lg max-w-[50%] break-words">
            {{ message.userMessage }}
          </p>
        </div>
        <!-- Respuestas del bot -->
        <div v-if="message.botResponse" class="text-left">
          <p class="bg-blue-100 text-blue-800 inline-block p-2 rounded-lg max-w-[50%] break-words">
            {{ message.botResponse }}
          </p>
        </div>
      </div>
    </div>

    <!-- Voiceflow Widget -->
    <div id="voiceflow-container" class="hidden"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [], // Lista de mensajes cargados desde el backend
      userId: 21, // ID del usuario (puedes adaptarlo para que sea dinámico)
    };
  },
  methods: {
    // Método para cargar conversaciones desde el backend
    async loadMessages() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/chatbot-interactions/api/chatbot-interactions/user/${this.userId}`
        );
        // Directamente usar la respuesta del backend
        this.messages = response.data;
        this.scrollToBottom();
      } catch (error) {
        console.error("Error al cargar las conversaciones:", error);
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.chatContainer;
        container.scrollTop = container.scrollHeight;
      });
    },
    loadVoiceflowChat() {
      // Cargar el widget de Voiceflow
      (function (d, t) {
        const v = d.createElement(t),
          s = d.getElementsByTagName(t)[0];
        v.onload = function () {
          window.voiceflow.chat.load({
            verify: { projectID: "67200f9910df1f272c34024e" },
            url: "https://general-runtime.voiceflow.com",
            versionID: "production",
            containerID: "voiceflow-container", // Contenedor del widget
            fullScreen: true, // Habilitar pantalla completa
          });
          document.getElementById("voiceflow-container").classList.remove("hidden");
        };
        v.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
        v.type = "text/javascript";
        s.parentNode.insertBefore(v, s);
      })(document, "script");
    },
  },
  mounted() {
    // Cargar las conversaciones cuando el componente se monta
    this.loadMessages();

    // Cargar Voiceflow chat al montar el componente
    this.loadVoiceflowChat();
  },
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
.pointer-events-none {
  pointer-events: none;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
