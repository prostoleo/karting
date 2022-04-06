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
        class="quiz-section__content content mt-12 bg-white shadow shadow-lg shadow-dark-50/10 shadow rounded-md min-h-80 overflow-hidden"
      >
        <div
          class="content-sale bg-orange-500 p-5 flex items-center justify-center text-lg"
        >
          <span class="text-center"
            >Скидка <b>10%</b><br />
            при бронировании онлайн</span
          >
        </div>
        <div class="content-wrapper"></div>
      </div>
      <div class="quiz-section__kart">
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

import { richtext } from '~/utils/storyblok/storyblok';
// import quiz from '@/assets/quiz/assets/index.b944bb25';

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

  mounted() {
    // const kartImgEl = this.$refs.kartImg;

    //* lazyload
    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({});
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
    opacity: 0.75;
  }
}
</style>
