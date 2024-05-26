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
                <div class="right-content">
                  <RouterLink to="/publishBooks">Publier un livre</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/DetailOfBooks">Details Livre</RouterLink>
                  <RouterLink class="activePage" to="/">Home</RouterLink>
                  <div class="dropdown">
                    <button class="dropbtn">More page</button>
                    <div class="dropdown-content">
                      <RouterLink to="/search-book" class="dropdown-a">search book</RouterLink>
                  </div>
                  </div>
                </div>
                <!--<RouterLink to="/pages">Pages</RouterLink>
                <RouterLink to="/about">About</RouterLink>
                <RouterLink to="/contact">Contact</RouterLink>-->
              </div>
          </nav>
      </div>
    </header>
    <RouterView />
    <footer></footer>
  </div>
</template>

<style>

/* -----------------------   Global [start]   ----------------------- */

body{
    margin: 0;
}

/* -----------------------   Global [end]   ----------------------- */

/* -----------------------   Header [start]   ----------------------- */
header {
    overflow: hidden;
    background-color: #1B3764;
    padding: 20px 10px;
}

header a,header img,header .right-content .dropbtn{
    float: left; /*aligne les élément à gauche par défault (même ligne)*/
    color: #FFFFFF;
    padding: 18px; /*espaces entre les élément*/
    text-decoration: none; /*enlève le trai des lien*/
    font-size: 18px;/*taille du text*/
    line-height: 25px;/*espace en haut*/
    border-radius: 4px;/*arondis les bort utiles lors du hover*/
}
header .dropdown-a{
  float: none;
}
header .right-content .dropbtn{
  color:#FFCA42;
  background-color: #1B3764;
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

header .header-right .right-content .router-link-active:hover,header .header-right .right-content .dropdown-a:hover {
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
    }
    
}



  header .dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
header .dropdown-content {

  display: none;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
header .dropdown-content a {

  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}



/* Show the dropdown menu on hover */
header .dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
header .dropdown:hover .dropbtn {
  background-color: #FFCA42;
  color: black;
}


/* -----------------------   Header [end]   ----------------------- */

</style>