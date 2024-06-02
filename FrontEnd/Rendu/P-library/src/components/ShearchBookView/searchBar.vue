<script setup>
import { ref, onMounted } from "vue";
import CategoriesService from "@/services/CategoriesService";

// Utiliser defineEmits pour définir les événements que ce composant peut émettre
const emit = defineEmits(['category-selected']);

const categories = ref(null);
const selectedCategory = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await CategoriesService.getCategories();
    categories.value = response.data;
  } catch (err) {
    error.value = "Une erreur s'est produite lors du chargement des catégories.";
    console.error(err);
  }
});

const handleCategoryChange = (event) => {
  selectedCategory.value = event.target.value;
  emit('category-selected', selectedCategory.value); // Émettre l'événement
};
</script>

<template>
  <div id="Search-bar">
    <div v-if="error" class="error">{{ error }}</div>
    <div v-else>
      <label for="category-select">Choisir une catégorie :</label>
      <select id="category-select" @change="handleCategoryChange">
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories?.data" :key="category.id" :value="category.id">
          {{ category.category }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* Style pour le sélecteur de catégorie */
#category-select {
  padding: 8px;
  margin: 10px 0;
}
.error {
  color: red;
}
</style>
