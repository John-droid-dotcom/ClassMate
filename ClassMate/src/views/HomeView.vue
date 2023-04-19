<script setup>
import q from "../data/quizes.json";
import { ref, watch } from "vue";
import Card from "../components/Card.vue";
import gsap from "gsap";

const quizes = ref(q);
const search = ref("");

watch(search, () => {
  quizes.value = q.filter((quiz) => {
    return quiz.name.toLowerCase().includes(search.value);
  });
});

const beforeEnter = (el) => {
  //card-enter-from
  console.log("before enter", el);
  el.style.opacity = 0;
  el.style.transform = "translateY(-60px)";
};
const enter = (el) => {
  //card-enter-to
  gsap.to(el, {
    y: 0,
    opacity: 1,
    duration: 0.3,
    delay: el.dataset.index * 0.2,
  });
};
</script>

<template>
  <div class="container">
    <header>
      <h1>Quizes</h1>
      <input v-model.trim="search" type="text" placeholder="Search..." />
    </header>

    <div class="options-container">
      <transition-group
        name="card"
        appear
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <Card
          v-for="(quiz, index) in quizes"
          :key="quiz.id"
          :quiz="quiz"
          :data-index="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

header {
  margin-bottom: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}

header h1 {
  font-weight: bold;
  margin-right: 30px;
}
header input {
  outline-color: lightblue;
  border: none;
  background-color: rgba(128, 128, 128, 0.8);
  padding: 10px;
  border-radius: 5px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
/*
.card-enter-from {
  transform: translateY(-50px);
  opacity: 0;
}

.card-enter-to {
}

.card-enter-active {
  transition: all 0.4s ease;
}*/
</style>
