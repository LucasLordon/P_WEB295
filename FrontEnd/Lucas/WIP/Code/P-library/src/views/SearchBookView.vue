
<script setup>
import { ref, onMounted } from "vue";
import searchResult from  "@/components/ShearchBookView/searchResult.vue";


</script>

<template>

      <div id="Search-book">
        <searchResult></searchResult>
        <h1>test</h1>
      </div>
</template>

<style>

#Search-book {
    max-width: 1200px;
    margin: 40px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

</style>