<template>
  <div class="about">
    <h1>Se connecter</h1>
    <form class="CreateAccountForm" @submit.prevent="loginToWebSite">
      <label for="pseudo">Pseudo :</label>
      <input id="pseudo" v-model="pseudo">

      <label for="passWord">Mot de passe :</label>
      <input id="passWord" v-model="passWord">

      <input class="button" type="submit" value="Submit">
    </form>
  </div>
</template>

<style>
.about{
  text-align: center; /* Centrage horizontal */
}

.CreateAccountForm {
  display: inline-block; /* Affichage en bloc pour que le texte et les éléments du formulaire soient alignés verticalement */
  text-align: left; /* Alignement du texte à gauche */
}

.CreateAccountForm label {
  display: block; /* Affichage en bloc pour les étiquettes, pour les placer les unes sous les autres */
  margin-bottom: 5px; /* Marge inférieure pour séparer les étiquettes */
}
</style>

<script>
import axios from 'axios';
export default{
  data(){
    return{
      pseudo :"",
      passWord :"",
      token: ""
    };
  },
  methods:{
    async loginToWebSite() {
      if(this.pseudo === "" || this.passWord ===""){
        alert("Le fomulaire doit être totalement remplis")
      }
      else{
         await axios
          .post('http://localhost:3000/api/login',{
            pseudo: this.pseudo,
            mot_de_passe: this.passWord,
          })
          .then((response) => {
            console.log(response.data);
            alert(response.data.message);
            this.token = response.data.token; // Utilisation de this ici fonctionnera correctement
            // met un variable dans le cache du navigateur
            localStorage.setItem('tokenOfUser',this.token)
        })
          .catch((error) =>{
            console.error(error);
            const errorMessage = error.response.data.message;
            alert(errorMessage);
          })
      }
      
    }
  }
}
</script>
