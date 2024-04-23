<script setup>
import { RouterLink, RouterView } from 'vue-router'
import headerCreateAccount from './components/HeaderCreateAccount.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <headerCreateAccount/>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/*Paramètre de fond du header de la page*/ 
header{
  background-color: #1B3764;
  color: white;
}
</style>
