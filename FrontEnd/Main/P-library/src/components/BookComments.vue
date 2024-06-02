<script setup>
import { ref, onMounted } from "vue";
import BookService from "@/services/BookService";
import { useRoute } from 'vue-router'

const route = useRoute();
const comments = ref([]);
const error = ref(null);
onMounted(async () => {
  try {
    const response = await BookService.getBooksComments(route.params.id);
    comments.value = response.data.data; // Assign directly to comments.value
    console.log("comments : ", comments.value);
  } catch (err) {
    error.value = "An error occurred while loading comments.";
    console.error(err);
  }
});


</script>

<template>


  <div v-if="(comments !== null)">
    <div class="detailComment">
      <h1>Comments</h1>
      <ul v-if="comments.count > 0">
        <li v-for="comment in comments.rows" :key="comment.id">{{ comment.comment }}</li>
      </ul>
      <div v-else>
        <p>Book have no comments</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Chargement en cours...</p>
  </div>
</template>




<style scoped>
/* styles spécifiques au composant */
</style>
