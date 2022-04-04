<template>
  <section id="quiz-section" v-editable="blok" class="quiz-section">
    <div class="container quiz-section__container">
      <div class="quiz-section__header header">
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
        <!-- <img
          src="https://a.storyblok.com/f/150258/525x349/fb0630f6c4/quiz-kart.png"
          class="quiz-section__kart-img"
        /> -->
        <img
          :src="story.kart_img.filename"
          :alt="story.kart_img.alt"
          class="quiz-section__kart-img"
        />
      </div>
      <!-- :alt="story.img.alt" -->
      <!-- /.quiz-section__kart -->
    </div>
    <!-- /.container quiz-section__container -->
  </section>
</template>

<script>
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

import { richtext } from '~/utils/storyblok/storyblok';

export default {
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
};
</script>

<style lang="scss" scoped>
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
  }
}
</style>
