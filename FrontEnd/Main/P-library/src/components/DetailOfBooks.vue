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
      <br>
      <p>Moyenne des appréciations : {{rating}}</p>
      <br>
      <p>categorie : {{ categorie }}</p>
      <div class="PostComment" v-if="postComment == true">
        <h3>Ajouter un commentaire</h3>
        <form class="PostCommentWithAppreciation" @submit.prevent="updateBook">
          <label for="comment">Commentaire :</label>
          <input id="comment" v-model="comment">

          <label for="appreciation">Appreciation</label>
          <select name="selectionOfAppreciation" id="selectionOfAppreciation" v-model="ratingOfUser">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <input class="button" type="submit" value="Ajouter commentaire">
        </form>
      </div>
      <br>
      <div class="editionOfBook" v-if="wantToEdit == true">
      <form class="CreateAccountForm" @submit.prevent="updateBook">
        <label for="title">titre :</label>
        <input id="title" v-model="title">

        <label for="summary">résumé :</label>
        <input id="summary" v-model="summary">

        <label for="page_count">Nombre de page :</label>
        <input id="page_count" v-model="page_count">

        <label for="nameOfCategory">Catégorie :</label>
        <input id="nameOfCategory" v-model="nameOfCategory">

        <input class="button" type="submit" value="Update">
      </form>
    </div>
      <button @click="DeleteBook">Supprimez le livre</button>
      <button @click="showFormToEdit">Editer</button>
      <button @click="showFormToPutComment">Ajouter un commentaire</button>
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
.editionOfBook {
  text-align: center;
  /* Centrage horizontal */
}
</style>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router'
const route = useRoute()
export default {
  data() {
    return {
      idOfBook: '',
      detailsOfBook: {},
      token: '',
      categorie:"",
      wantToEdit:false,
      postComment:false,
      page_count: "",
      nameOfCategory: "",
      summary: "",
      title: "",
      nameOfCategory: "",
      categories_id:"",
      rating: 0,
      comment:"",
      ratingOfUser: 0
    };
  },
  async created() {
    const route = useRoute();
    this.idOfBook = route.params.id;
    await this.GetAppreciationOfBook();
    await this.GetDetailOfBook();
    await this.getNameOfCategorie();
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
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
          console.log(this.token);
        })
    },
    showFormToPutComment(){
      this.postComment = true
    },
    async GetAppreciationOfBook(){
      await axios
        .get(`http://localhost:3000/api/comments/commentsOfBook/${this.idOfBook}`)
        .then((response) => {
          ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
          console.log(response.data);
          let allRating  = [];
          for(let i =0; i< response.data.data.count;i++){
            allRating.push(response.data.data.rows[i].appreciation);
          }
          for(let i = 0;i<allRating.length;i++){
            this.rating += allRating[i]
            this.rating
          }
          this.rating = this.rating/allRating.length;
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        })
    },
    async postCommentAndAppreciation(){

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
    },
    async getNameOfCategorie(){
      this.token = localStorage.getItem('tokenOfUser');
      await axios
        .get(`http://localhost:3000/api/categories/${this.detailsOfBook.data.categories_id}`,
          {
            headers: {
              'Authorization': 'Bearer ' + this.token
            }
          })
        .then((response) => {
          ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
          console.log(response.data);
          this.categorie = response.data.data.category;
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
          console.log(this.token);
        })
    },
    showFormToEdit(){
      this.wantToEdit = true;
    },
    async updateBook(){
      if(this.title ===""){
        this.title = this.detailsOfBook.data.title;
      }
      if(this.summary ===""){
        this.summary = this.detailsOfBook.data.summary;
      }
      if(this.page_count ===""){
        this.page_count = this.detailsOfBook.data.page_count;
      }
      if(this.nameOfCategory === ""){
        this.categories_id = this.detailsOfBook.data.categories_id
        await this.getNameOfCategorie();
      }
      if(this.nameOfCategory !== ""){
        await this.getCategoryByName();
      }
      await axios
      .put(`http://localhost:3000/api/books/${this.idOfBook}`,
        {
          title: this.title,
          summary: this.summary,
          page_count: this.page_count,
          categories_id: this.categories_id,
        },
        {
          headers:{
            'Authorization': 'Bearer ' + this.token
          }
        })
        .then((response) =>{
          console.log(response.data);
          alert("Le livre à bien été mis à jour");
          window.location.reload();
        })
        .catch((error) =>{
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        })
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
  }
}
</script>