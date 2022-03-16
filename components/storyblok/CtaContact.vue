<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import { richtext } from '~/utils/storyblok/storyblok.js';

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
    useStoryblokBridge(this.slide._uid, (newStory) => (this.slide = newStory));
  },
};
</script>

<template>
  <section class="cta-section">
    <div class="container cta-section__container">
      <div class="cta-section__content content">
        <h2 class="content__title">{{ story.content.title }}</h2>
        <!-- /.content__title -->
        <form action="" class="content__form form">
          <div class="form__inputs">.form__input-item</div>
          <!-- /.form__inputs -->
          <button class="form__submit btn"></button>
          <!-- /.form__submit btn -->
        </form>
        <!-- /.content__form form -->
      </div>
      <!-- /.cta-section__content content -->
    </div>
    <!-- /.container cta-section__container -->
    <div class="cta-section__bg">
      <img src="" alt="" class="cta-section__bg-img" />
    </div>
    <!-- /.cta-section__bg -->
  </section>
  <!-- /.cta-section -->
</template>

<style lang="scss" scoped></style>
