<script setup>
import { defineProps } from 'vue';


defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const getBookCoverUrl = (image) => {
  try {
    return `/Books/${image}/bookCover.jpg`;
  } catch (e) {
    console.error("Erreur lors du chargement de l'image du livre :", e);
    return '';
  }
};
</script>

<template>
  <div id="book">
    <div class="book-left">
      <h1>Book Title : {{ book.data.title }}</h1>
      <h2>summary :</h2>
      <p>{{ book.data.summary }}</p>
      <h2>Book of the day :</h2>
      <div class="info-line">
        <div class="info-item">
          <h3>Pages:</h3>
          <p>{{ book.data.page_count }}</p>
        </div>
        <div class="info-item">
          <h3>Length:</h3>
          <p>{{(book.data.page_count*2/60).toFixed(0) }} hours</p>
        </div>
        <!-- <div class="info-item">
          <h3>Rating:</h3>
          <p>4.5/5 (305 ratings)</p>
        </div> -->
      </div>
    </div>
    <div class="book-right">
      <img :src="getBookCoverUrl(book.data.image)" alt="Book cover">
    </div>
  </div>
</template>

<style scoped>


/* -----------------------   randomBook.book [start]   ----------------------- */

#book {

display: flex;
justify-content: space-between;
margin-top: 30px;
margin-bottom: 30px;
max-width: 1200px;
margin-inline: auto;
}

.book-left {
display: flex;
justify-content: center;
flex-direction: column;
}


.book-left .info-line {
display: flex;
}

.book-left .info-line h3 {
margin-right: 20px;
}

.book-right {
display: flex;
justify-content: space-around;
flex-wrap: wrap;
}

.book-right img {
width: 60%;
} 

/* -----------------------   randomBook.book [end]   ----------------------- */

</style>

