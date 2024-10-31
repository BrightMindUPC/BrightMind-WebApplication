<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ResourceExercise from '../components/ResourceExercise.vue'

const route = useRoute()

const id = ref(route.params.id)

watch(
  () => route.params.id,
  (newId) => {
    id.value = newId
  }
)
</script>

<template>
  <header class="flex justify-between w-full items-center">
    <div>
      <h1 class="text-3xl font-bold">Recursos de Algebra</h1>
      <h3 class="text-xl font-bold mt-2">Funciones derivadas</h3>
    </div>
    <div class="text-lg text-gray-600 font-medium tracking-wider">
      #{{ id }}
    </div>
  </header>
  <div class="mt-4">
    <p>
      Este material está diseñado para ayudarte a comprender y practicar las
      derivadas en el contexto del álgebra. A través de este tutorial,
      aprenderás los conceptos básicos y avanzados de las derivadas, con
      ejemplos prácticos y explicaciones detalladas. El objetivo es mejorar tu
      comprensión de las reglas de derivación y tus habilidades en cálculo
      diferencial.
    </p>
  </div>
  <div class="mt-8">
    <ResourceExercise />
  </div>
</template>
