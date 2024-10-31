<script setup>
import Image from 'primevue/image'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import ResourceChatbotModal from './ResourceChatbotModal.vue'

const prompt = ref('')

const modalVisible = ref(false)
</script>

<template>
  <div>
    <!-- HEADER -->
    <header>
      <p class="font-bold">Ejercicio 1</p>
      <p class="mt-1">Calcular la derivada de la siguiente función:</p>
    </header>
    <!-- BODY CONTENT -->
    <div>
      <Image
        src="https://i.ibb.co/TTnZHzS/funcion-ejercicio-1-1.png"
        alt="Ejercicio 1"
        :width="400"
        preview
        :pt="{ originalContainer: 'bg-white' }"
      />
    </div>

    <!-- FOOTER -->
    <div class="flex gap-3 max-w-lg">
      <div class="w-full flex flex-col relative">
        <InputText type="text" v-model="prompt" class="!w-full" />
        <small class="text-xs font-medium absolute top-full"
          >¿Necesitas ayuda?
          <span class="underline cursor-pointer" @click="modalVisible = true"
            >Mira la resolución paso a paso con la IA</span
          ></small
        >
      </div>
      <Button class="shrink-0">Enviar</Button>
    </div>

    <ResourceChatbotModal
      :visible="modalVisible"
      :onClose="() => (modalVisible = false)"
    />
  </div>
</template>
