
<script setup>
import { ref, onMounted } from "vue";
import Book from "@/components/randomBook/book.vue";
import Author from "@/components/randomBook/author.vue";
import title2 from "@/components/randomBook/title.vue";
import Comments from "@/components/randomBook/comments.vue";
import BookService from "@/services/BookService";
import AuthorService from "@/services/AuthorService";

const limit = ref(null);
const maxlimit = ref(null);
const countBook = ref(null);
const books = ref(null);
const book = ref(null);
const author = ref(null);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await BookService.getBooks();
    books.value = response.data;
    limit.value = books.value.data.length - 5;
    maxlimit.value = books.value.data.length;
    countBook.value = limit.value;

    await updateBook();
    await updateAuthor();
  } catch (err) {
    error.value = "Une erreur s'est produite lors du chargement des livres.";
    console.error(err);
  }
});

const updateBook = async () => {
  const response = await BookService.getBook(countBook.value);
  book.value = response.data;
};

const updateAuthor = async () => {
  const response = await AuthorService.getAuthors(countBook.value);
  author.value = response.data;
};

const incrementCount = async () => {
  if (countBook.value < maxlimit.value) {
    countBook.value += 1;
    await updateBook();
    await updateAuthor();
  }
};

const decrementCount = async () => {
  if (countBook.value > limit.value) {
    countBook.value -= 1;
    await updateBook();
    await updateAuthor();
  }
};
</script>

<template>
  <div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="(book !== null) && (author !== null)">
      <div>
        <title2></title2>
        <button @click="incrementCount">+</button>
        <button @click="decrementCount">-</button>
      </div>
      <div class="randomBook">
        <Book :book="book"></Book>
        <Author :author="author" :book="book"></Author>
        <Comments></Comments>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>