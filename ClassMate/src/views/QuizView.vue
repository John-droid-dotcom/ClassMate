<script setup>
import q from "../data/quizes.json";
import Question from "../components/Question.vue";
import QuizHeader from "../components/QuizHeader.vue";
import Result from "../components/Result.vue";
import { useRoute } from "vue-router";
import { ref, watch, computed } from "vue";

const route = useRoute();
const id = +route.params.id;

const quiz = q.find((q) => q.id === id);
const currentQuestionIndex = ref(0);
const numberOfCorrectAnswers = ref(0);
const showResult = ref(false);

// const questionStatus = ref(
//   `${currentQuestionIndex.value}/${quiz.questions.length}`
// );

// watch(
//   () => currentQuestionIndex.value,
//   () => {
//     questionStatus.value = `${currentQuestionIndex.value}/${quiz.questions.length}`;
//   }
// );

const questionStatus = computed(
  () => `${currentQuestionIndex.value}/${quiz.questions.length}`
);

const barPercentage = computed(
  () => `${(currentQuestionIndex.value / quiz.questions.length) * 100}%`
);

const onOptionSelected = (isCorrect) => {
  if (isCorrect) {
    numberOfCorrectAnswers.value++;
  }

  if (quiz.questions.length - 1 === currentQuestionIndex.value) {
    showResult.value = true;
  }
  currentQuestionIndex.value++;
};
</script>

<template>
  <div class="container">
    <div>
      <QuizHeader
        :questionStatus="questionStatus"
        :barPercentage="barPercentage"
      />
    </div>
    <Question
      v-if="!showResult"
      :question="quiz.questions[currentQuestionIndex]"
      @selectOption="onOptionSelected"
    />
    <Result
      v-else
      :quizQuestionLength="quiz.questions.length"
      :numberOfCorrectAnswers="numberOfCorrectAnswers"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}
</style>
