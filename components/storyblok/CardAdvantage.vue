<template>
  <div v-editable="slide" class="content-advantages__card card">
    <div class="card__icon">
      <ion-icon
        :src="`${slide.icon[0].filename}`"
        :alt="slide.icon[0].alt"
        class="card__icon-img"
        style="color: red"
      ></ion-icon>
    </div>
    <h3 class="card__title">{{ slide.title }}</h3>
    <div class="card__description" v-html="richtext(slide.description)"></div>
  </div>
  <!-- /.content-advantages__card card -->
</template>

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
      slide: this.blok,
      richtext,
    };
  },

  mounted() {
    useStoryblokBridge(this.slide._uid, (newStory) => (this.slide = newStory));
  },
};
</script>

<style lang="scss" scoped>
.card {
  height: 100%;

  color: white;
  background: $redMy-800;

  box-shadow: $shadowMy;
  padding: 36px 20px;

  @include mq(lg) {
  }
  @include mq(xl) {
    padding: 42px 26px;
  }

  // .card__icon

  &__icon {
    --mb-icon: 20px;

    margin-bottom: var(--mb-icon);

    @include mq(xl) {
      --mb-icon: 36px;
    }

    // .card__icon-img

    &-img {
      font-size: 40px;

      @include mq(xl) {
        font-size: 60px;
      }
    }
  }

  // .card__title

  &__title {
    font-size: 20px;
    font-weight: 700;
    line-height: 100%;

    margin-bottom: 1em;

    position: relative;
    z-index: 7;
    text-shadow: 0.1em 0.1em 1px #000;
  }

  // .card__description

  &__description {
    opacity: 0.85;
  }
}
</style>
