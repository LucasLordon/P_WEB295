<script setup>
import BookService from "@/services/BookService";
import { ref, onMounted } from "vue";

const props = defineProps({
  book: { required: true}
  }
)

const author = ref(null);
const error = ref(null);



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
  <div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="author !== null">
      <div class="book" href="#pages">
        <div class="book-image" style="background-image: url('../../assets/images/Books/cantHurtMe/bookCover.jpg');"></div>
        <div class="book-info">
          <h2>{{ book.title }}</h2>
          <p>Résumer : </p>
          <p>{{ book.summary }}</p>
          <p>Author : {{ author.data.rows[0].name}} {{  author.data.rows[0].firstName }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
    
</template>

<style scoped>
  
  .book {
    max-width: 300px;
    width: calc(33.33% - 20px);
    margin: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .book-image{
    height: 200px;
    background-position: top center;
    background-size: cover;
    margin-bottom: 10px;
  }
  .book-image img{
    height: 200px;
    position: top center;
    size: cover;
  }
  .book h2 {
    font-weight: bold;
    margin-top: 0;
  }
  
  .book p {
    margin-bottom: 10px;
  }

</style>

