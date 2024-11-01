<template>
  <div class="p-8">
    <!-- Título -->
    <h1 class="text-2xl font-bold mb-4">
      Bienvenido al centro de recursos educativos
    </h1>

    <!-- Barra de búsqueda -->
    <div class="mb-4">
      <input
        type="text"
        placeholder="Busca tu material de estudio"
        class="w-full p-2 border rounded"
        v-model="searchQuery"
      />
    </div>

    <!-- Filtros -->
    <div class="flex gap-4 mb-6">
      <!-- Materia -->
      <div>
        <label class="block font-medium mb-1">Materia</label>
        <select class="p-2 border rounded w-full" v-model="filters.subject">
          <option>Matemática</option>
          <option>Física</option>
          <option>Química</option>
        </select>
      </div>

      <!-- Nivel académico -->
      <div>
        <label class="block font-medium mb-1">Nivel académico</label>
        <select
          class="p-2 border rounded w-full"
          v-model="filters.academicLevel"
        >
          <option>Secundaria</option>
          <option>Primaria</option>
          <option>Universidad</option>
        </select>
      </div>

      <!-- Tipo de recurso -->
      <div>
        <label class="block font-medium mb-1">Tipo de recurso</label>
        <select
          class="p-2 border rounded w-full"
          v-model="filters.resourceType"
        >
          <option>Ejercicios</option>
          <option>Teoría</option>
          <option>Práctica</option>
        </select>
      </div>
    </div>

    <!-- Tarjetas de recursos -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="resource in filteredResources"
        :key="resource.id"
        class="bg-blue-100 p-4 rounded shadow flex flex-col cursor-pointer"
        @click="openResource(resource)"
      >
        <div class="flex items-center justify-between mb-2">
          <!-- Icono -->
          <div class="text-4xl text-blue-500">{{ resource.icon }}</div>

          <!-- Etiqueta -->
          <span class="bg-blue-300 text-xs font-bold rounded-full px-2 py-1">{{
            resource.type
          }}</span>
        </div>

        <!-- Título -->
        <h2 class="text-lg font-semibold">{{ resource.title }}</h2>

        <!-- Descripción -->
        <p class="text-sm text-gray-600 mt-1">
          {{ resource.description }}
        </p>

        <!-- Barra de progreso -->
        <div class="mt-auto pt-4">
          <div class="h-2 bg-gray-200 rounded-full">
            <div
              class="h-2 bg-blue-500 rounded-full"
              :style="{ width: resource.progress + '%' }"
            ></div>
          </div>
          <p class="text-right text-sm mt-1">{{ resource.progress }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourceCenter',
  data() {
    return {
      searchQuery: '',
      filters: {
        subject: 'Matemática',
        academicLevel: 'Secundaria',
        resourceType: 'Ejercicios',
      },
      resources: [
        {
          id: 1,
          title: 'Funciones derivadas',
          description:
            'Practica el cálculo de derivadas y refuerza tus conocimientos sobre las reglas básicas de diferenciación.',
          icon: '√x',
          type: 'Ejercicio',
          subject: 'Matemática',
          academicLevel: 'Secundaria',
          resourceType: 'Ejercicios',
          progress: 20,
        },
        {
          id: 2,
          title: 'Límites y continuidad',
          description:
            'Refuerza tus conocimientos sobre límites y continuidad en funciones matemáticas.',
          icon: '∞',
          type: 'Teoría',
          subject: 'Matemática',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 50,
        },
        {
          id: 3,
          title: 'Ecuaciones cuadráticas',
          description:
            'Aprende a resolver ecuaciones cuadráticas y aplica técnicas de factorización.',
          icon: 'x²',
          type: 'Práctica',
          subject: 'Matemática',
          academicLevel: 'Secundaria',
          resourceType: 'Práctica',
          progress: 30,
        },
        {
          id: 4,
          title: 'Leyes de Newton',
          description:
            'Explora las tres leyes de Newton y cómo afectan el movimiento de los objetos.',
          icon: 'F=ma',
          type: 'Teoría',
          subject: 'Física',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 75,
        },
        {
          id: 5,
          title: 'Problemas de dinámica',
          description:
            'Practica la resolución de problemas de dinámica aplicando las leyes de Newton.',
          icon: 'ΣF',
          type: 'Ejercicio',
          subject: 'Física',
          academicLevel: 'Secundaria',
          resourceType: 'Ejercicios',
          progress: 40,
        },
        {
          id: 6,
          title: 'Enlace iónico y covalente',
          description:
            'Distingue entre enlaces iónicos y covalentes y aprende sus características.',
          icon: 'e⁻',
          type: 'Teoría',
          subject: 'Química',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 60,
        },
        {
          id: 7,
          title: 'Tabla periódica',
          description:
            'Conoce la estructura de la tabla periódica y cómo se organizan los elementos.',
          icon: 'H₂O',
          type: 'Teoría',
          subject: 'Química',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 90,
        },
        {
          id: 8,
          title: 'Reacciones químicas',
          description:
            'Aprende a balancear reacciones químicas y a identificar reactivos y productos.',
          icon: '→',
          type: 'Práctica',
          subject: 'Química',
          academicLevel: 'Secundaria',
          resourceType: 'Práctica',
          progress: 50,
        },
        {
          id: 9,
          title: 'Geometría analítica',
          description:
            'Estudia la geometría en el plano cartesiano y trabaja con ecuaciones de rectas.',
          icon: '(x,y)',
          type: 'Ejercicio',
          subject: 'Matemática',
          academicLevel: 'Secundaria',
          resourceType: 'Ejercicios',
          progress: 25,
        },
        {
          id: 10,
          title: 'Trabajo y energía',
          description:
            'Analiza el concepto de trabajo y energía en diferentes sistemas físicos.',
          icon: 'W=Fd',
          type: 'Teoría',
          subject: 'Física',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 65,
        },
        {
          id: 11,
          title: 'Estática y equilibrio',
          description:
            'Explora el equilibrio de fuerzas y condiciones de estática en objetos rígidos.',
          icon: '∑τ=0',
          type: 'Ejercicio',
          subject: 'Física',
          academicLevel: 'Secundaria',
          resourceType: 'Ejercicios',
          progress: 15,
        },
        {
          id: 12,
          title: 'Teoría de conjuntos',
          description:
            'Comprende los fundamentos de la teoría de conjuntos y operaciones entre ellos.',
          icon: '∩ ∪',
          type: 'Teoría',
          subject: 'Matemática',
          academicLevel: 'Secundaria',
          resourceType: 'Teoría',
          progress: 85,
        },
        // Agrega más recursos aquí según sea necesario
      ],
    }
  },
  computed: {
    filteredResources() {
      return this.resources.filter((resource) => {
        return (
          resource.subject === this.filters.subject &&
          resource.academicLevel === this.filters.academicLevel &&
          resource.resourceType === this.filters.resourceType &&
          resource.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      })
    },
  },
  methods: {
    openResource(resource) {
      this.$router.push({
        name: 'ResourceDetailPage',
        params: { id: resource.id },
      })
    },
  },
}
</script>

<style scoped></style>
