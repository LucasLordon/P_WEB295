<template>
  <div class="greetings">
    <form class="CreateAccountForm" @submit.prevent="createTheAccount">
      <label for="pseudo">Pseudo :</label>
      <input id="pseudo" v-model="pseudo">

      <label for="passWord">Mot de passe :</label>
      <input id="passWord" v-model="passWord">

      <input class="button" type="submit" value="Submit">
    </form>
  </div>
</template>

<style scoped>
.greetings {
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
      passWord :""
    };
  },
  methods:{
    async createTheAccount() {
      if(this.pseudo === "" || this.passWord ===""){
        alert("Le fomulaire doit être totalement remplis")
      }
      else{
         await axios
          .post('http://localhost:3000/api/users',{
            pseudo: this.pseudo,
            mot_de_passe: this.passWord,
	          date_entree: new Date()
          })
          .then(function (response) {
            console.log(response.data);

          })
          .catch(function (error){
            console.error(error);
          })
      }
      
    }
  }
}
</script>


