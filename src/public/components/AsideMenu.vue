<template>
  <PanelMenu
    :model="items"
    class="w-full md:w-80 scroll-auto h-full"
    :pt="{
      panel: '!bg-neutral-900 !border-0',
      headerContent: 'hover:!bg-neutral-800',
      itemContent: 'hover:!bg-neutral-800',
    }"
  >
    <template #item="{ item }">
      <router-link
        v-if="item.route"
        v-slot="{ href, navigate }"
        :to="item.route"
        custom
      >
        <a
          v-ripple
          class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
          :href="href"
          @click="navigate"
        >
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </router-link>
      <a
        v-else
        v-ripple
        class="flex items-center cursor-pointer text-surface-700 dark:text-surface-0 px-4 py-2"
        :href="item.url"
        :target="item.target"
      >
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
      </a>
    </template>
  </PanelMenu>

  <div class="mt-auto">
    <div class="flex items-center gap-4">
      <Image
        class="w-16 h-16 rounded-full block overflow-hidden shrink-0"
        src="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
        alt="Brightmind AI"
      />
      <p class="font-semibold w-full">Pepito Flores</p>
      <Button
        icon="pi pi-cog"
        text
        aria-label="Config"
        class="!text-white shrink-0"
        iconClass="!text-xl"
      />
    </div>
  </div>
</template>

<script setup>
import Image from 'primevue/image'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const items = ref([
  {
    label: 'Brightmind AI',
    icon: 'pi pi-microchip-ai',
    items: [
      {
        label: 'Explicame de los integrales...',
      },
    ],
  },
  {
    label: 'Recursos educativos',
    icon: 'pi pi-folder',
    command: () => router.push('/recursos-educativos'),
  },
  {
    label: 'Soporte técnico',
    icon: 'pi pi-info-circle',
    command: () => router.push('/soporte-tecnico'),
  },
  {
    label: 'Planes de estudio',
    icon: 'pi pi-list',
    command: () => router.push('/planes-de-estudio'),
  },
])
</script>
