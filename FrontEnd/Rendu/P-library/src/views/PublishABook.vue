<template>
  <div class="publishBooks">
    <h1>Publier votre livre</h1>
    <form class="CreateAccountForm" @submit.prevent="publishBook">
      <label for="title">titre :</label>
      <input id="title" v-model="title">

      <label for="summary">résumé :</label>
      <input id="summary" v-model="summary">

      <label for="image">Lien vers une image :</label>
      <input id="image" v-model="image">

      <label for="page_count">Nombre de page :</label>
      <input id="page_count" v-model="page_count">

      <label for="nameOfCategory">Catégorie :</label>
      <input id="nameOfCategory" v-model="nameOfCategory">

      <input class="button" type="submit" value="Submit">
    </form>
  </div>
</template>

<style>
.publishBooks {
  text-align: center;
  /* Centrage horizontal */
}

.CreateAccountForm {
  display: inline-block;
  /* Affichage en bloc pour que le texte et les éléments du formulaire soient alignés verticalement */
  text-align: left;
  /* Alignement du texte à gauche */
}

.CreateAccountForm label {
  display: block;
  /* Affichage en bloc pour les étiquettes, pour les placer les unes sous les autres */
  margin-bottom: 5px;
  /* Marge inférieure pour séparer les étiquettes */
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      price: 9.99,
      title: "",
      image: "",
      summary: "",
      nameOfCategory: "",
      categories_id: "",
      page_count: "",
      customers_id: "",
      authors_id: 7,
      token: ""
    };
  },
  methods: {
    infoToInt() {
      this.page_count = parseInt(this.page_count)
      return this.page_count
    },
    async getCategoryByName() {
      let isDataNull = 0;
      this.token = localStorage.getItem('tokenOfUser');
      await axios
          .get(`http://localhost:3000/api/categories/categoriesName?category=${this.nameOfCategory}`,
            {
              headers: {
                'Authorization': 'Bearer ' + this.token
              }
            })
          .then((response) => {
            ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
            if(response.data.data == null){
              isDataNull = response.data.data
            }
            else{
              this.categories_id = response.data.data.id;
            }
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            alert(errorMessage);
            console.log(this.token);
          })
          if (isDataNull == null){
            await this.createCategoryIfNoneExist();
          }
    },
    async createCategoryIfNoneExist(){
      this.token = localStorage.getItem('tokenOfUser');
      await axios
          .post(`http://localhost:3000/api/categories`,
          {
            category: this.nameOfCategory
          }, 
          {
              headers: {
                'Authorization': 'Bearer ' + this.token
              }
            })
          .then((response) => {
            ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
            this.categories_id = response.data.data.id;
          })
          .catch((error) => {
            console.error(error);
            const errorMessage = error.response.data.message;
            alert(errorMessage);
            console.log(this.token);
          })
    },
    async publishBook() {
      if (this.title === "" || this.summary === "" || this.image === "" || this.page_count === "" || this.nameOfCategory === "") {
        alert("Le fomulaire doit être totalement remplis")
      }
      else {
        await this.getCategoryByName();
        this.customers_id = localStorage.getItem('idOfUser')
        this.token = localStorage.getItem('tokenOfUser');
        this.page_count = this.infoToInt();
        await axios
          .post('http://localhost:3000/api/books', {
            price: this.price,
            title: this.title,
            image: this.image,
            summary: this.summary,
            categories_id: this.categories_id,
            page_count: this.page_count,
            customers_id: this.customers_id,
            authors_id: this.authors_id
          },
            {
              headers: {
                'Authorization': 'Bearer ' + this.token
              }
            })
          .then((response) => {
            ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
            alert(response.data.message);
          })
          .catch((error) => {
            const errorMessage = error.response.data.message;
            alert(errorMessage);
          })
      }
    }
  }
}
</script>
