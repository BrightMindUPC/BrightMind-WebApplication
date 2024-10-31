<script setup>
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { nextTick, ref } from 'vue'

const props = defineProps({
  visible: Boolean,
  onClose: Function,
})

const chatList = ref([
  {
    message: 'Hola, ¿en qué puedo ayudarte?',
    role: 'bot',
  },
  {
    message: 'En el punto 3, como era la derivación de multiples variables?',
    role: 'user',
  },
  {
    message:
      'La derivación de multiples variables se realiza de la siguiente manera...',
    role: 'bot',
  },
])

const prompt = ref('')
const loading = ref(false)
const chatListEl = ref(null)

const handleSend = () => {
  if (!prompt.value) return

  chatList.value.push({
    message: prompt.value,
    role: 'user',
  })

  prompt.value = ''
  loading.value = true

  setTimeout(() => {
    chatList.value.push({
      message: 'Para resolver ese problema es sencillo, solo tienes que...',
      role: 'bot',
    })

    nextTick(() => {
      chatListEl.value.scrollTop = chatListEl.value.scrollHeight
    })
    loading.value = false
  }, 1000)
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    :style="{ width: '45rem' }"
    :pt="{
      headerActions: 'ml-auto',
    }"
  >
    <template #closeicon>
      <Button icon="pi pi-times" class="shrink-0" @click="onClose" />
    </template>
    <div class="flex flex-col w-full gap-8 max-h-80 overflow-y-scroll">
      <div
        v-for="chat in chatList"
        ref="chatListEl"
        :class="{
          'bg-gray-200 self-end': chat.role === 'user',
        }"
        class="p-2 rounded-md max-w-96"
      >
        {{ chat.message }}
      </div>
    </div>

    <div class="mt-10 flex gap-4">
      <InputText
        v-model="prompt"
        class="w-full"
        aria-placeholder="Escribe tu duda academica y te ayudaremos..."
        placeholder="Escribe tu duda academica y te ayudaremos..."
        :disabled="loading"
      />
      <Button
        icon="pi pi-send"
        class="shrink-0"
        @click="handleSend"
        :disabled="loading"
      />
    </div>
  </Dialog>
</template>
