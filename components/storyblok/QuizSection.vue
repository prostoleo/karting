<template>
  <section id="quiz-section" v-editable="blok" class="quiz-section">
    <div class="container quiz-section__container">
      <div class="quiz-section__header header">
        <h2 class="header__title">{{ story.title }}</h2>
        <!-- /.header__title -->
        <h3 class="header__subtitle">
          {{ story.subtitle }}
        </h3>
        <!-- /.header__subtitle -->
      </div>
      <!-- /.quiz-section__header header -->
      <div
        id="quiz-wrapper"
        class="quiz-section__content max-w-[750px] content mt-12 bg-white shadow shadow-lg shadow-dark-50/10 shadow rounded-md min-h-80 overflow-hidden mx-auto"
      >
        <div
          class="content-sale bg-orange-500/80 p-5 flex items-center justify-center text-lg"
        >
          <span class="text-center text-dark-900"
            >Скидка <b>10%</b><br />
            при бронировании онлайн</span
          >
        </div>
        <div class="content-wrapper p-5 h-full">
          <CustomProgress></CustomProgress>

          <transition name="question" mode="out-in" class="overflow-hidden">
            <QuizWrapper v-if="getActiveIndex == 1" :key="1"></QuizWrapper>
            <QuizWrapper v-else-if="getActiveIndex == 2" :key="2"></QuizWrapper>
            <QuizWrapper v-else-if="getActiveIndex == 3" :key="3"></QuizWrapper>
            <QuizWrapper v-else-if="getActiveIndex == 4" :key="4"></QuizWrapper>
            <QuizWrapper v-else-if="getActiveIndex == 5" :key="5"></QuizWrapper>
            <QuizWrapper v-else-if="getActiveIndex == 6" :key="6"></QuizWrapper>
            <QuizForm v-else :key="7" final></QuizForm>
          </transition>
        </div>
      </div>
      <div class="quiz-section__kart hidden">
        <!-- <img
          src="https://a.storyblok.com/f/150258/525x349/fb0630f6c4/quiz-kart.png"
          class="quiz-section__kart-img"
        /> -->
        <img
          ref="kartImg"
          :data-src="`${story.kart_img.filename}/m/300x0`"
          width="300"
          height="200"
          :alt="story.kart_img.alt"
          loading="lazy"
          class="quiz-section__kart-img lazy"
        />
      </div>
      <!-- :alt="story.img.alt" -->
      <!-- /.quiz-section__kart -->
    </div>
    <!-- /.container quiz-section__container -->
  </section>
</template>

<script>
import LazyLoad from 'vanilla-lazyload';
// import { mapGetters } from 'vuex';
// import '@/assets/quiz/assets/index.b944bb25';
// import '@/assets/quiz/assets/vendor.d6682b4f';
/* <div class="quiz-section__header header">
        <h2 class="header__title">{{ story.title }}</h2>
        <!-- /.header__title -->
        <h4 class="header__subtitle">
          {{ story.subtitle }}
        </h4>
        <!-- /.header__subtitle -->
      </div>
      <!-- /.quiz-section__header header -->
      <div id="quiz" class="quiz-section__content"></div>
      <div class="quiz-section__kart">
        <img
          :src="`${story.img.filename}/m/`"
          :alt="story.img.alt"
          class="quiz-section__kart-img"
        />
      </div>
      <!-- /.quiz-section__kart --> */

import CustomProgress from '../quiz/CustomProgress.vue';
import QuizWrapper from '../quiz/QuizWrapper.vue';
import { richtext } from '~/utils/storyblok/storyblok';
// import quiz from '@/assets/quiz/assets/index.b944bb25';

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CustomProgress, QuizWrapper },
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      story: this.blok,
      richtext,
    };
  },

  computed: {
    // ...mapGetters(['getActiveIndex']),
    getActiveIndex() {
      return this.$store.getters.getActiveIndex;
    },
  },

  mounted() {
    // const kartImgEl = this.$refs.kartImg;
    //* lazyload
    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({});
  },
};
</script>

<style lang="scss" scoped>
.question-enter-active {
  transition: all 0.3s ease-out;
}

.question-leave-active {
  transition: all 0.3s ease-in-out 0.3s;
}

.question-enter-from {
  transform: scale(0.75, 0.75);
  opacity: 0;
}
.question-leave-to {
  transform: scale(1.15, 1.15);
  opacity: 0;
}

.question-enter-to,
.question-leave-from {
  transform: scale(1, 1);
  opacity: 1;
}

.quiz-section {
  @extend %tpl-section;

  // .quiz-section__container

  &__container {
    position: relative;
  }

  // .quiz-section__header

  &__header {
  }

  // .quiz-section__content

  &__content {
  }

  // .quiz-section__kart

  &__kart {
    position: absolute;
    bottom: 10%;
    right: 2%;

    // .quiz-section__kart-img

    &__kart-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.container {
}
.header {
  // .header__title

  &__title {
    @extend %tpl-section-title;
    color: $redMy-900;
    text-align: center;

    margin-bottom: 0.15em;
  }

  // .header__subtitle

  &__subtitle {
    text-align: center;
    opacity: 0.8;
  }
}
</style>
