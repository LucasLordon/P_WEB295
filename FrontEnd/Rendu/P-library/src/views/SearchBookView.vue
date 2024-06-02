<script setup>
import { ref, onMounted } from "vue";
import searchResult from  "@/components/ShearchBookView/searchResult.vue";
import searchBar from "@/components/ShearchBookView/searchBar.vue";
import CategoriesService from "@/services/CategoriesService";
import BookService from "@/services/BookService";
//
const books = ref(null);
const error = ref(null);
const selectedCategory = ref(null); // Variable pour stocker la catégorie sélectionnée

onMounted(async () => {
  try {
    const response = await CategoriesService.getAllCategoriesBooks();
    books.value = response.data;
    console.log("books : ")
    console.log(books.value.data)

  } catch (err) {
    error.value = "Une erreur s'est produite lors du chargement des livres.";
    console.error(err);
  }
});

const onCategorySelected = async (categoryId) => {
  if (categoryId === "") {
    // Si la catégorie sélectionnée est vide, cela signifie "Toutes les catégories"
    const response = await CategoriesService.getAllCategoriesBooks(); // Appeler une fonction pour obtenir tous les livres
    books.value = response.data;
  } else {
    selectedCategory.value = categoryId;
    console.log("Catégorie sélectionnée:", categoryId);
    const response = await CategoriesService.getCategoriesBooks(selectedCategory.value);
    books.value = response.data;
    console.log("new book : ")
    console.log(books.value)
  }
};



</script>

<template>
  <div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="books !== null">
      <div id="Search-book">
        <searchBar @category-selected="onCategorySelected"></searchBar> <!-- Écouter l'événement -->
        <div class="book-list">
          <searchResult v-for="book in books.data.rows" :key="book.id" :book="book"></searchResult>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>

<style>
.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#Search-book {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
