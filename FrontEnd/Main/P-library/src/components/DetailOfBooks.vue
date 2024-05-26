<template>
  <div v-if="(detailsOfBook && detailsOfBook.data)">
    <div class="detailBook">
      <img :src="detailsOfBook.data.image" alt="pictureOfBook">
      <h1>{{ detailsOfBook.data.title }}</h1>
      <br>
      <p>Prix: {{ detailsOfBook.data.price }}</p>
      <br>
      <p>Nombre de page: {{ detailsOfBook.data.page_count }}</p>
      <br>
      <p>Résumé : {{ detailsOfBook.data.summary }}</p>
      <button @click="DeleteBook">Supprimez le livre</button>
    </div>
  </div>
  <div v-else>
    <p>Chargement en cours...</p>
  </div>
</template>

<style>
.detailBook {
  text-align: center;
  /* Centrage horizontal */
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      idOfBook: '3',
      detailsOfBook: {},
      token: '',
    };
  },
  async mounted() {
    await this.GetDetailOfBook();
  },
  methods: {
    async GetDetailOfBook() {
      this.token = localStorage.getItem('tokenOfUser');
      await axios
        .get(`http://localhost:3000/api/books/${this.idOfBook}`,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          })
        .then((response) => {
          ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
          console.log(response.data);
          this.detailsOfBook = response.data;
          console.log(this.detailsOfBook.data.title)
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
          console.log(this.token);
        })
    },
    async DeleteBook() {
      await axios
        .delete(`http://localhost:3000/api/books/${this.idOfBook}`,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          })
        .then((response) => {
          ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
          console.log(response.data);
          this.detailsOfBook = response.data;
          alert(response.data.message);
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
          console.log(this.token);
        })
    }
  }
}
</script>