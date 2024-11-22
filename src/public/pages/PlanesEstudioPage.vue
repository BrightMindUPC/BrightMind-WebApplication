<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Planes de Estudio</h1>
  
      <!-- Filtros -->
      <div class="flex items-center gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Materia</label>
          <select
            v-model="filters.subject"
            @change="applyFilters"
            class="mt-1 block w-full p-2 border rounded-md"
          >
            <option value="">Todas</option>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Física">Física</option>
          </select>
        </div>
  
        <div class="flex-grow">
          <label class="block text-sm font-medium text-gray-700">Buscar</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Buscar por nombre..."
            class="mt-1 block w-full p-2 border rounded-md"
            @input="applyFilters"
          />
        </div>
  
        <!-- Botón para mostrar favoritos -->
        <button
          class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          @click="toggleViewFavorites"
        >
          {{ showFavorites ? 'Ver Todos' : 'Ver Favoritos' }}
        </button>
      </div>
  
      <!-- Tarjetas de planes de estudio -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="lesson in filteredLessons"
          :key="lesson.id"
          class="p-4 rounded shadow flex flex-col justify-between"
          :class="[ 'border-2', lesson.isFavorite ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 bg-white' ]"
        >
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold">{{ lesson.title }}</h2>
            <button
              class="text-gray-600 hover:text-blue-500"
              @click="viewLessonDetails(lesson)"
            >
              <i class="pi pi-eye text-xl"></i>
            </button>
          </div>
          <p class="text-gray-600 mb-4">Materia: {{ lesson.subject }}</p>
          <button
            class="px-4 py-2 rounded text-white"
            :class="lesson.isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'"
            @click="toggleFavorite(lesson)"
          >
            {{ lesson.isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos' }}
          </button>
        </div>
      </div>
  
      <!-- Modal de mini lecciones -->
      <div
        v-if="selectedLesson"
        class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="bg-white rounded-lg shadow-lg w-5/6 max-w-4xl p-6">
          <h2 class="text-2xl font-bold mb-4">{{ selectedLesson.title }}</h2>
          <ul class="mb-4">
            <li
              v-for="miniLesson in selectedLesson.miniLessons"
              :key="miniLesson.id"
              class="flex items-center justify-between p-2 border-b last:border-b-0"
            >
              <span>{{ miniLesson.title }}</span>
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                @click="viewMoreDetails(miniLesson)"
              >
                Ver Más Detalles
              </button>
            </li>
          </ul>
          <div class="flex justify-end">
            <button
              class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              @click="closeModal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "PlanesEstudioPage",
    data() {
      return {
        lessons: [
  {
    id: 1,
    title: "Álgebra Básica",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Introducción al Álgebra" },
      { id: 2, title: "Ecuaciones Básicas" },
      { id: 3, title: "Factores y Múltiplos" },
    ],
  },
  {
    id: 2,
    title: "Cinemática",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Movimiento Rectilíneo Uniforme" },
      { id: 2, title: "Movimiento Acelerado" },
      { id: 3, title: "Gráficas de Movimiento" },
    ],
  },
  {
    id: 3,
    title: "Geometría Euclidiana",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Teoremas Básicos" },
      { id: 2, title: "Propiedades de Triángulos" },
      { id: 3, title: "Relaciones de Paralelismo" },
    ],
  },
  {
    id: 4,
    title: "Dinámica",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Primera Ley de Newton" },
      { id: 2, title: "Segunda Ley de Newton" },
      { id: 3, title: "Fuerzas de Fricción" },
    ],
  },
  {
    id: 5,
    title: "Ecuaciones Diferenciales",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Ecuaciones de Primer Orden" },
      { id: 2, title: "Métodos de Resolución" },
      { id: 3, title: "Aplicaciones" },
    ],
  },
  {
    id: 6,
    title: "Termodinámica",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Primera Ley de la Termodinámica" },
      { id: 2, title: "Calor y Trabajo" },
      { id: 3, title: "Segunda Ley de la Termodinámica" },
    ],
  },
  {
    id: 7,
    title: "Trigonometría Avanzada",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Funciones Trigonométricas" },
      { id: 2, title: "Identidades Trigonométricas" },
      { id: 3, title: "Ángulos Notables" },
    ],
  },
  {
    id: 8,
    title: "Óptica Básica",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Reflexión de la Luz" },
      { id: 2, title: "Refracción de la Luz" },
      { id: 3, title: "Lentes y Espejos" },
    ],
  },
  {
    id: 9,
    title: "Cálculo Diferencial",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Límites" },
      { id: 2, title: "Derivadas" },
      { id: 3, title: "Regla de la Cadena" },
    ],
  },
  {
    id: 10,
    title: "Electromagnetismo",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Ley de Coulomb" },
      { id: 2, title: "Campos Eléctricos" },
      { id: 3, title: "Potencial Eléctrico" },
    ],
  },
  {
    id: 11,
    title: "Probabilidad",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Eventos y Espacios Muestrales" },
      { id: 2, title: "Probabilidad Condicional" },
      { id: 3, title: "Distribuciones Discretas" },
    ],
  },
  {
    id: 12,
    title: "Gravitación Universal",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Ley de Gravitación de Newton" },
      { id: 2, title: "Órbitas Planetarias" },
      { id: 3, title: "Aplicaciones Astronómicas" },
    ],
  },
  {
    id: 13,
    title: "Estadística Descriptiva",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Medidas de Tendencia Central" },
      { id: 2, title: "Medidas de Dispersión" },
      { id: 3, title: "Representaciones Gráficas" },
    ],
  },
  {
    id: 14,
    title: "Ondas",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Movimiento Ondulatorio" },
      { id: 2, title: "Ondas Sonoras" },
      { id: 3, title: "Principio de Superposición" },
    ],
  },
  {
    id: 15,
    title: "Álgebra Lineal",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Vectores y Matrices" },
      { id: 2, title: "Determinantes" },
      { id: 3, title: "Sistemas de Ecuaciones Lineales" },
    ],
  },
  {
    id: 16,
    title: "Física Moderna",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Teoría de la Relatividad" },
      { id: 2, title: "Dualidad Onda-Partícula" },
      { id: 3, title: "Modelos Atómicos" },
    ],
  },
  {
    id: 17,
    title: "Cálculo Integral",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Integrales Definidas" },
      { id: 2, title: "Métodos de Integración" },
      { id: 3, title: "Aplicaciones de Integrales" },
    ],
  },
  {
    id: 18,
    title: "Fluidos",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Propiedades de Fluidos" },
      { id: 2, title: "Principio de Arquímedes" },
      { id: 3, title: "Dinámica de Fluidos" },
    ],
  },
  {
    id: 19,
    title: "Análisis Numérico",
    subject: "Matemáticas",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Interpolación" },
      { id: 2, title: "Métodos Numéricos" },
      { id: 3, title: "Aproximación de Derivadas" },
    ],
  },
  {
    id: 20,
    title: "Mecánica Cuántica",
    subject: "Física",
    isFavorite: false,
    miniLessons: [
      { id: 1, title: "Principio de Incertidumbre" },
      { id: 2, title: "Ecuación de Schrödinger" },
      { id: 3, title: "Estados Cuánticos" },
    ],
  },
  // Continúa añadiendo hasta llegar a 30
],

        showFavorites: false,
        filters: {
          subject: "",
          search: "",
        },
        selectedLesson: null,
      };
    },
    computed: {
      filteredLessons() {
        return this.lessons.filter((lesson) => {
          const matchesFavorites = this.showFavorites ? lesson.isFavorite : true;
          const matchesSubject = this.filters.subject
            ? lesson.subject === this.filters.subject
            : true;
          const matchesSearch = this.filters.search
            ? lesson.title.toLowerCase().includes(this.filters.search.toLowerCase())
            : true;
  
          return matchesFavorites && matchesSubject && matchesSearch;
        });
      },
    },
    methods: {
      toggleFavorite(lesson) {
        lesson.isFavorite = !lesson.isFavorite;
      },
      toggleViewFavorites() {
        this.showFavorites = !this.showFavorites;
      },
      applyFilters() {
        this.showFavorites = false;
      },
      viewLessonDetails(lesson) {
        this.selectedLesson = lesson;
      },
      closeModal() {
        this.selectedLesson = null;
      },
      viewMoreDetails(miniLesson) {
        alert(`Ver más detalles sobre: ${miniLesson.title}`);
        // Redirigir o abrir otro modal para mostrar más detalles
      },
    },
  };
  </script>
  
  <style scoped>
  .grid {
    gap: 1.5rem;
  }
  
  button {
    transition: all 0.2s ease-in-out;
  }
  
  button:hover {
    transform: scale(1.05);
  }
  </style>
  