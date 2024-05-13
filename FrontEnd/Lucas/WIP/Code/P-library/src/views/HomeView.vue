
<script setup>
import { ref, onMounted } from "vue";
import Book from "@/components/randomBook/book.vue";
import Author from "@/components/randomBook/author.vue";
import Comments from "@/components/randomBook/comments.vue";
import BookService from "@/services/BookService";
import AuthorService from "@/services/AuthorService";

const books = ref(null);
const author = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await BookService.getBooks();
    books.value = response.data;
    console.log(books.value.data.length);

    const response2 = await AuthorService.getAuthors(1);
    author.value = response2.data;
    console.log(author.value.data.length);
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
    <div v-else-if="(books !== null)&&(author !== null)">
      <div class="randomBook">
        <Book :books="books"></Book>
        <Author :author="author"></Author>
        <Comments></Comments>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>