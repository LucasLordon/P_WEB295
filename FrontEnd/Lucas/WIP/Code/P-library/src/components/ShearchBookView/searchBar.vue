<script setup>

</script>

<template>
    <Search-bar>
          <div class="Search-list">
                      <input type="search" placeholder="Find a book">
                      <div class="dropdown">
                        <button class="dropbtn">Categories</button>
                        <div class="dropdown-content">
                          <a href="#">Link 1</a>
                          <a href="#">Link 2</a>
                          <a href="#">Link 3</a>
                        </div>
                      </div>
                      <div class="dropdown">
                        <button class="dropbtn">Rating</button>
                        <div class="dropdown-content">
                          <div class="wrapper">
                            <div class="values">
                                <span id="range1">
                                    0
                                </span>
                                <span> &dash; </span>
                                <span id="range2">
                                    5
                                </span>
                            </div>
                            <div class="container">
                                <div class="slider-track"></div>
                                <input type="range" min="0" max="5" value="0" id="slider-1" oninput="slideOne()">
                                <input type="range" min="0" max="5" value="5" id="slider-2" oninput="slideTwo()">
                            </div>
                        </div>
                        </div>
                      </div>
          </div>
        </Search-bar>
</template>

<style scoped>

/* -----------------------   randomBook.comment [start]   ----------------------- */


/* -----------------------   randomBook.comment [end]   ----------------------- */
</style>

