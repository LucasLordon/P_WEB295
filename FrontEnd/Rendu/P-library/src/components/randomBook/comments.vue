<script setup>
import { defineProps } from 'vue';

defineProps({
  book: {
    type: Object,
    required: true,
  },
})
</script>

<template>
        <div id="comments">
            <div class="comment-left">
                <!-- <h1>What Readers Say About the Book</h1>
                <p>If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators.</p>
                <p>Overall Customer Ratings (4.8/5)</p> -->
                <RouterLink :to="`/BookComments/${book.data.id}/`">
                    <button class="comment-btn">See Comments</button>
                </RouterLink>
            </div>
            <!-- <div class="comment-right">
                <div class="info-line">
                    <div class="info-item">
                        <img src="../../assets/images/Users/default.png" alt="user1">
                        <h1>Martin Philips</h1>
                        <h2>"Awesome impact"</h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat willings predefined chunks value.</p>
                    </div>
                    <div class="info-item">
                        <img src="../../assets/images/Users/default.png" alt="user2">
                        <h1>James Anderson</h1>
                        <h2>"Awesome impact"</h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat willings predefined chunks value.</p>
                    </div>
                </div>
            </div> -->
        </div>
</template>

<style scoped>

/* -----------------------   randomBook.comment [start]   ----------------------- */

#comments {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin-inline: auto;
}

#comments .info-line {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

#comments .info-item:not(:last-child) {
    width: 50%;
    border-bottom: 1px solid #ccc;
}

#comments .info-item img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px;
}

#comments .info-item h1 {
    font-size: 18px;
    margin-bottom: 10px;
}

#comments .info-item h2 {
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
}

#comments .info-item p {
    font-size: 14px;
    color: #999;
}

#comments .comment-btn {
    background-color: #FFCA42;
    color: #446688;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#comments .comment-btn:hover {
    background-color: #334d66;
    color: #FFCA42;
}


/* -----------------------   randomBook.comment [end]   ----------------------- */
</style>

