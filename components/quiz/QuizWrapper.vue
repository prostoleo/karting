<template>
  <div
    :id="`step-${getActiveIndex}`"
    class="quiz-content-wrapper w-full h-full"
  >
    <h4>{{ compTitle }}</h4>

    <div>
      <QuizRadio v-if="getCurData.type === 'radio'"></QuizRadio>
      <QuizDate v-else-if="getCurData.type === 'date'"></QuizDate>
      <QuizTime v-else-if="getCurData.type === 'time'"></QuizTime>
      <QuizSlider
        v-else-if="
          getCurData.type === 'slider-radio' ||
          getCurData.type === 'slider-checkbox'
        "
        :type="getCurData.type"
      ></QuizSlider>
    </div>

    <div class="mt-5 mx-auto w-max">
      <button
        class="mr-4 border border-solid px-[1em] py-[0.5em] border-red-500 text-red-500 text-lg"
        @click="toPrevQuestion"
      >
        К предыдущему
      </button>
      <QuizNextBtn class="" @btn-click="toNextQuestion">
        Cледующий вопрос
      </QuizNextBtn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import QuizNextBtn from './QuizNextBtn.vue';
import QuizRadio from './variants/QuizRadio.vue';
export default {
  components: {
    QuizNextBtn,
    QuizRadio,
  },

  props: {
    final: {
      type: Boolean,
      required: false,
    },
  },

  data() {
    return {
      // radio: null,
    };
  },

  computed: {
    ...mapGetters(['getActiveIndex', 'getCurData', 'getCurDataOption']),
    compTitle() {
      return `${this.getActiveIndex}. ${this.getCurData.title}`;
    },
  },

  methods: {
    toPrevQuestion() {
      this.$store.commit('resetChosenOptionOnActiveIndex');
      this.$store.commit('decreaseActiveIndex');
    },

    toNextQuestion() {
      // console.log('zzz');
      if (!this.getCurDataOption) {
        let str = '';

        switch (this.getCurData.type) {
          case 'radio':
            str = 'Выберите один из вариантов, для того чтобы продолжить';
            break;
          case 'date':
            str = 'Выберите дату для того, чтобы продолжить';
            break;
          case 'time':
            str = 'Выберите время с 10:00 до 21:30 для того, чтобы продолжить';
            break;
          case 'slider-radio':
            str = 'Выберите один из вариантов для того, чтобы продолжить';
            break;
          case 'slider-checkbox':
            str =
              'Выберите один или несколько вариантов для того, чтобы продолжить';
            break;

          default:
            break;
        }

        this.$buefy.notification.open({
          duration: 5000,
          message: str,
          position: 'is-top',
          type: 'is-danger',
        });

        return;
      }

      this.$store.commit('incrementActiveIndex');
    },
  },
};
</script>

<style lang="scss" scoped></style>
