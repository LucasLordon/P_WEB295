
<script setup>
import { ref, onMounted } from "vue";
import searchResult from  "@/components/ShearchBookView/searchResult.vue";
import BookService from "@/services/BookService";


const books = ref(null);
const error = ref(null);


onMounted(async () => {
  try {
    const response = await BookService.getBooks();
    books.value = response.data;
    console.log(books.value.data[1].authors_id);

  } catch (err) {
    error.value = "Une erreur s'est produite lors du chargement des livres.";
    console.error(err);
  }
});
</script>

<template>
  <div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="books !== null">
      <div id="Search-book">
        <div class="book-list">
          <searchResult v-for="book in books.data" :key="book.id" :book="book"></searchResult>
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