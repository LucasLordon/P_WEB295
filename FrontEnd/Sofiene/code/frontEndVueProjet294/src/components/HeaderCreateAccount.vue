<script setup>
defineProps({
  msg: {
    type: String,
    required: false
  }
})
</script>

<template>
  <div class="greetings">
    <h2>Create Account</h2>
    <!--Ajouter les balise routerLink quand finis-->
    <nav>
      <ul>
        <li>Home</li>
        <li>Pages</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
    <h1>Create your account</h1>
    <h3>Create an account so you can read all your favorite books and discover many more.</h3>
  </div>
</template>

<style scoped>
/*positionnement du home de la page*/

h3{
  text-align: center;
  margin-top: 3%;
}
h2, nav{
  padding-top: 3%;
  display: inline-block;
  vertical-align: top;
  margin-right:2%;
}
h2{
  text-align: left;
  padding-left: 15%;
}

nav ul {
  list-style-type: none; /* Enlève les puces */
  display: flex; /* Affiche les éléments en ligne */
  font-size: 20px;
}
nav{
  float: right;
  padding-right: 5%;
}
nav li {
  width: 100%;
  margin-right: 5%;
}
nav li:last-child{
  margin-right: 0%;
}
h1{
 text-align: center;
 width: 100%;
}
</style>
