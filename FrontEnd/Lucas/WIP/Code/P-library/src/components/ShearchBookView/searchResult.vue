<script setup>
import BookService from "@/services/BookService";
import { ref, onMounted } from "vue";

const props = defineProps({
  book: { required: true }
});

const author = ref(null);
const error = ref(null);

const getBookCoverUrl = (image) => {
  try {
    return (`/Books/${image}/bookCover.jpg`);
  } catch (e) {
    console.error("Erreur lors du chargement de l'image du livre :", e);
    return '';
  }
};

onMounted(async () => {
  try {
    const response = await BookService.getBooksAuthors(props.book.authors_id);
    author.value = response.data;
  } catch (err) {
    error.value = "Une erreur s'est produite lors du chargement des livres.";
    console.error(err);
  }
});

</script>

<template>
  <div id="Search-book">
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="author !== null && book !== null">
      <div class="book-list">
        <div class="book" href="#pages">
          <div class="book-image" :style="{ backgroundImage: `url(${getBookCoverUrl(book.image)})` }"></div>
          <div class="book-info">
            <h2>{{ book.title }}</h2>
            <p>Résumé : </p>
            <p>{{ book.summary }}</p>
            <p>Auteur : {{ author.data.rows[0].name }} {{ author.data.rows[0].firstName }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>

<style scoped>
#Search-book {
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.book {
  max-width: 300px;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.book-image {
  height: 200px;
  background-position: top center;
  background-size: cover;
  margin-bottom: 10px;
}

.book-info h2 {
  font-weight: bold;
  margin-top: 0;
}

.book-info p {
  margin-bottom: 10px;
}
</style>
