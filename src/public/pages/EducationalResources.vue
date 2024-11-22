<template>
  <div class="p-8">
    <!-- Título -->
    <h1 class="text-2xl font-bold mb-4">
      Bienvenido al centro de recursos educativos
    </h1>

    <!-- Filtros -->
    <div class="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Filtro por Grado -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Grado</label>
        <select
          v-model="filters.grade"
          @change="applyFilters"
          class="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Todos</option>
          <option value="FIRST_YEAR">Primero</option>
          <option value="SECOND_YEAR">Segundo</option>
          <option value="THIRD_YEAR">Tercero</option>
          <option value="FOURTH_YEAR">Cuarto</option>
          <option value="FIFTH_YEAR">Quinto</option>
        </select>
      </div>

      <!-- Filtro por Materia -->
      <div>
        <label class="block text-sm font-medium text-gray-700">Materia</label>
        <select
          v-model="filters.subject"
          @change="applyFilters"
          class="mt-1 block w-full p-2 border rounded-md"
        >
          <option value="">Todas</option>
          <option value="MATH">Matemáticas</option>
          <option value="SCIENCE">Ciencias</option>
          <option value="LITERATURE">Literatura</option>
          <option value="HISTORY">Historia</option>
          <option value="PHYSICS">Física</option>
          <option value="CHEMISTRY">Química</option>
        </select>
      </div>
    </div>

    <!-- Tarjetas de recursos -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="resource in resources"
        :key="resource.id"
        class="bg-blue-100 p-4 rounded shadow flex flex-col cursor-pointer"
        @click="selectResource(resource)"
      >
        <!-- Título -->
        <h2 class="text-lg font-semibold">{{ resource.title }}</h2>

        <!-- Materia -->
        <p class="text-sm text-gray-600 mt-1">
          Materia: {{ resource.subjectTranslated }}
        </p>

        <!-- Grado académico -->
        <p class="text-sm text-gray-600">
          Nivel académico: {{ resource.gradeTranslated }}
        </p>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="selectedResource"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-start justify-center z-50 pt-10"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-lg w-5/6 max-w-5xl p-6 relative">
        <!-- Botón de cerrar -->
        <button
          class="absolute top-4 right-4 text-red-600 font-bold text-2xl hover:text-red-800"
          @click="closeModal"
        >
          ✕
        </button>

        <!-- Información del recurso -->
        <h2 class="text-2xl font-bold mb-4">{{ selectedResource.title }}</h2>
        <p><strong>Materia:</strong> {{ selectedResource.subjectTranslated }}</p>
        <p><strong>Grado:</strong> {{ selectedResource.gradeTranslated }}</p>

        <!-- Visor de PDF -->
        <div class="mt-4">
          <h3 class="font-bold mb-2">Vista previa del recurso:</h3>
          <iframe
            :src="pdfUrl"
            class="w-full h-[80vh] border rounded"
            frameborder="0"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ResourceCenter",
  data() {
    return {
      resources: [],
      selectedResource: null,
      pdfUrl: "",
      filters: {
        grade: "",
        subject: "",
      },
    };
  },
  methods: {
    async fetchResources() {
      try {
        let url = "http://localhost:8080/api/resources/api/resources";
        if (this.filters.grade && this.filters.subject) {
          url += `/grade/${this.filters.grade}/subject/${this.filters.subject}`;
        } else if (this.filters.grade) {
          url += `/grade/${this.filters.grade}`;
        } else if (this.filters.subject) {
          url += `/subject/${this.filters.subject}`;
        }

        const response = await axios.get(url);

        // Mapear y traducir los datos
        this.resources = response.data.map((resource) => ({
          id: resource.id,
          title: resource.title,
          subject: resource.subject,
          grade: resource.grade,
          subjectTranslated: this.translateSubject(resource.subject),
          gradeTranslated: this.translateGrade(resource.grade),
        }));
      } catch (error) {
        console.error("Error al cargar los recursos:", error);
      }
    },
    translateSubject(subject) {
      const subjects = {
        MATH: "Matemáticas",
        SCIENCE: "Ciencias",
        LITERATURE: "Literatura",
        HISTORY: "Historia",
        PHYSICS: "Física",
        CHEMISTRY: "Química",
      };
      return subjects[subject] || subject;
    },
    translateGrade(grade) {
      const grades = {
        FIRST_YEAR: "Primero",
        SECOND_YEAR: "Segundo",
        THIRD_YEAR: "Tercero",
        FOURTH_YEAR: "Cuarto",
        FIFTH_YEAR: "Quinto",
      };
      return grades[grade] || grade;
    },
    applyFilters() {
      this.fetchResources();
    },
    selectResource(resource) {
      this.selectedResource = resource;
      this.pdfUrl = `http://localhost:8080/api/resources/api/resources/${resource.id}/view`;
    },
    closeModal() {
      this.selectedResource = null;
      this.pdfUrl = "";
    },
  },
  mounted() {
    this.fetchResources();
  },
};
</script>

<style scoped>
/* Opcional: Añadir sombra y efecto al botón de cerrar */
button.absolute {
  transition: transform 0.2s ease, color 0.2s ease;
}
button.absolute:hover {
  transform: scale(1.1);
}
</style>
