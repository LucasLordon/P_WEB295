<script setup>

</script>

<template>
  <div class="book-list">
    <div class="book" href="#pages">
      <div class="book-image" style="background-image: url('../../assets/images/Books/cantHurtMe/bookCover.jpg');">
      </div>

      <div class="book-info">
        <h2>THE LAST FOUR THINGS</h2>
        <p>Educated A MEMOIR</p>
        <p>Significant reading has more info number</p>
        <p>Author - 23.05.2022</p>
      </div>
    </div>
    <div class="book" href="#pages">
      <div class="book-image">
        <img src="../../assets/images/Books/cantHurtMe/bookCover.jpg" alt="Book of the day cover">
      </div>
      <div class="book-info">
        <h2>THE LAST FOUR THINGS</h2>
        <p>Educated A MEMOIR</p>
        <p>Significant reading has more info number</p>
        <p>Author - 23.05.2022</p>
      </div>
    </div>
    <div class="book" href="#pages">
      <div class="book-image">
        <img src="../../assets/images/Books/cantHurtMe/bookCover.jpg" alt="Book of the day cover">
      </div>
      <div class="book-info">
        <h2>THE LAST FOUR THINGS</h2>
        <p>Educated A MEMOIR</p>
        <p>Significant reading has more info number</p>
        <p>Author - 23.05.2022</p>
      </div>
    </div>
    <div class="book" href="#pages">
      <div class="book-image">
        <img src="../../assets/images/Books/cantHurtMe/bookCover.jpg" alt="Book of the day cover">
      </div>
      <div class="book-info">
        <h2>THE LAST FOUR THINGS</h2>
        <p>Educated A MEMOIR</p>
        <p>Significant reading has more info number</p>
        <p>Author - 23.05.2022</p>
      </div>
    </div>
    <div class="book" href="#pages">
      <div class="book-image">
        <img src="../../assets/images/Books/cantHurtMe/bookCover.jpg" alt="Book of the day cover">
      </div>
      <div class="book-info">
        <h2>THE LAST FOUR THINGS</h2>
        <p>Educated A MEMOIR</p>
        <p>Significant reading has more info number</p>
        <p>Author - 23.05.2022</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

  
  .book-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .book {
    max-width: 300px;
    width: calc(33.33% - 20px);
    margin: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .book-image{
    height: 200px;
    background-position: top center;
    background-size: cover;
    margin-bottom: 10px;
  }
  .book-image img{
    height: 200px;
    position: top center;
    size: cover;
  }
  .book h2 {
    font-weight: bold;
    margin-top: 0;
  }
  
  .book p {
    margin-bottom: 10px;
  }

</style>

