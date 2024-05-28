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
        <form class="PostCommentWithAppreciation" @submit.prevent="postCommentAndAppreciation">
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
        <h3>Modifier le livre</h3>
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
      <div class="popUp" v-if="popUpVisible">
        <p>Voulez-vous vraiment supprimé ce livre ?</p>
        <button @click="DeleteBook">Supprimer</button>
        <button @click="showDeletePopUp">Annuler</button>
      </div>
      <button @click="showDeletePopUp">Supprimez le livre</button>
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
.popUp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: blue;
}
</style>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      idOfBook: '1',
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
      ratingOfUser: 0,
      popUpVisible : false
    };
  },
  async mounted() {
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
      if(!this.postComment){
        this.postComment = true
      }
      else{
        this.postComment = false
      }
      
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
      let idOfUser = localStorage.getItem("idOfUser");
      if(this.comment ===""){
        this.comment = "Pas de commentaire";
      }
      if(this.ratingOfUser === null || this.ratingOfUser === undefined){
        alert("Veuillez entrer un appréciation");
      }
      else{
        await axios
        .post(`http://localhost:3000/api/comments`,
        {
          comment:this.comment,
          appreciation: this.ratingOfUser,
          books_id: this.idOfBook,
          com_customers_id:idOfUser
        })
        .then((response) => {
          ////TO DOOOOOOO : SUPPRIMEZ LE CACHE QUAND LE NAV EST FERMé
          console.log(response.data);
          alert("Commentaire ajouté")
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
          const errorMessage = error.response.data.message;
          alert(errorMessage);
        })
      }
    },
    showDeletePopUp(){
      if(!this.popUpVisible){
        this.popUpVisible = true
      }
      else{
        this.popUpVisible = false
      }
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
      if(!this.wantToEdit){
        this.wantToEdit = true;
      }
      else{
        this.wantToEdit = false;
      }
      
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