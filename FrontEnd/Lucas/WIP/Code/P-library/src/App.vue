<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <div class="wrapper">
          <nav>
              <img class="logo" src="../public/logo.png" alt="logo">
              <a class="activePage">Home</a>
              <div class="header-right">
                <RouterLink class="activePage" to="/">Home</RouterLink>
                <RouterLink to="/pages">Pages</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>
              </div>
          </nav>
      </div>
    </header>
    <RouterView />
    <footer></footer>
  </div>
</template>

<style>

/* -----------------------   Header [start]   ----------------------- */
header {
    overflow: hidden;
    background-color: #1B3764;
    padding: 20px 10px;
}

header a,header img,header RouterLink{
    float: left; /*aligne les élément à gauche par défault (même ligne)*/
    color: #FFFFFF;
    padding: 18px; /*espaces entre les élément*/
    text-decoration: none; /*enlève le trai des lien*/
    font-size: 18px;/*taille du text*/
    line-height: 25px;/*espace en haut*/
    border-radius: 4px;/*arondis les bort utiles lors du hover*/
}

/*Style du titre de la page*/
header a.activePage {
    font-size: 25px;
    font-weight: bold;
    color: #FFCA42;
}

header img.logo{
    width: 50px;
    line-height: 0px;
    padding: 9px;
}

header .header-right :hover {
    background-color: #FFCA42;
    color: black;
}

.header-right {
    float: right;
}

@media screen and (max-width: 555px) {
    header a {
      float: none;
      display: block;
      text-align: left;
    }
    .header-right {
      float: none;
    }
    header img.logo{
        padding: 9px;
        line: height 25px;
    }
    
}
/* -----------------------   Header [end]   ----------------------- */

</style>
