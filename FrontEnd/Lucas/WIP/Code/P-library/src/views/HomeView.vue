<script setup>
import { ref, onMounted } from "vue";

import Book from "@/components/randomBook/book.vue";
import Author from "@/components/randomBook/author.vue";
import Comments from "@/components/randomBook/comments.vue";

import BookService from "@/services/BookService";

const books = ref(null);

onMounted(() => {
  BookService.getBooks()
    .then((response) => {
      books.value = response.data;
      console.log(books.value.data.length);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>

  <div v-if="books =! null">
    <div class="randomBook">
      <Book :books="books"></Book>
      <Author></Author>
      <Comments></Comments>
    </div>
  </div>
  <div v-else><p>Chargement en cours...</p></div>
</template>
