<script setup>
defineProps({
    book: {
    type: Object,
    required: true,
    },
    author: {
    type: Object,
    required: true,
  },
})



const getBookCoverUrl = (image) => {
  try {
    return `/Books/${image}/authorCover.jpg`;
  } catch (e) {
    console.error("Erreur lors du chargement de l'image du livre :", e);
    return '';
  }
};
</script>



<template>
  <div>
    <div v-if="error">
      <h1>{{ error }}</h1>
    </div>
    <div v-else-if="book && author">
        <div id="author">
            <div class="author-left">
                <img :src="getBookCoverUrl(book.data.image)" alt="Author of the day">
            </div>
            <div class="author-right">
                <h1>About {{ author.data.firstName }} {{ author.data.name }}</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div class="info-line">
                <div class="info-item">
                    <h3>{{ book.data.publishedBooks }}</h3>
                    <p>Books Published</p>
                </div>
                <div class="info-item">
                    <h3>{{ book.data.userReviews }}</h3>
                    <p>User Reviews</p>
                </div>
                <div class="info-item">
                    <h3>{{ book.data.totalComments }}</h3>
                    <p>Total Comments</p>
                </div>
                </div>
                <button class="author-btn">More about {{ author.data.firstName }} {{ author.data.name }}</button>
            </div>
        </div>
    </div>
    <div v-else>
      <p>Chargement en cours...</p>
    </div>
  </div>
</template>


<style scoped>


/* -----------------------   randomBook.author [start]   ----------------------- */

#author {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 30px;
    max-width: 1200px;
    margin-inline: auto;
}

.author-right {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-start;
}

.author-right .info-line {
    display: flex;
}

.author-left {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}

.author-left img {
    width: 60%;
}

.author-right .info-line {
    display: flex;
    padding: 10px;
    border-radius: 5px;
    width: 50%;
}

.author-right .info-item h3 {
    font-size: 2rem;
    color: #446688;
    margin-bottom: 5px;
}

.author-right .info-item p {
    font-size: 1.2rem;
    color: #666;
}

.author-right .info-item:not(:last-child) {
    margin-right: 20px;
    border-right: 3px solid #FFCA42;
}


.author-btn {
    background-color: #FFCA42;
    color: #446688;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.author-btn:hover {
    background-color: #334d66;
    color: #FFCA42;
}

/* -----------------------   randomBook.author [end]   ----------------------- */

</style>

