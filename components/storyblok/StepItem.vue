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
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },
};
</script>

<template>
  <div v-editable="story" class="steps__item">
    <div
      class="steps__item-color"
      :style="`background-color: ${story.color}`"
    ></div>
    <!-- /.steps__item-color -->
    <h3 class="steps__item-title">{{ story.title }}</h3>
    <!-- /.steps__item-title -->
    <p class="steps__item-subtitle">{{ story.subtitle }}</p>
    <!-- /.steps__item-subtitle -->
  </div>
</template>

<style lang="scss" scoped>
.steps {
  // .steps__item

  &__item {
    max-width: 250px;

    display: grid;

    grid-template-columns: min-content 1fr;
    grid-template-rows: repeat(2, auto);
    grid-template-areas:
      'color-round title'
      'color-round subtitle';
    gap: 5px 15px;

    &:nth-of-type(1) {
      @include mq(xl) {
        grid-area: first;
      }
    }
    &:nth-of-type(2) {
      @include mq(xl) {
        grid-area: second;
      }
    }
    &:nth-of-type(3) {
      @include mq(xl) {
        grid-area: third;
      }
    }
    &:nth-of-type(4) {
      @include mq(xl) {
        grid-area: fourth;
      }
    }

    &:nth-of-type(2n) {
      grid-template-columns: 1fr min-content;
      grid-template-areas:
        'title color-round'
        'subtitle color-round';
      justify-self: flex-end;
      justify-items: flex-end;

      .steps__item-title {
        justify-self: flex-end;
        text-align: right;
      }

      .steps__item-subtitle {
        justify-self: flex-end;
        text-align: right;
      }

      .steps__item-color {
      }
    }
  }

  // .steps__item-color

  &__item-color {
    width: 25px;
    height: 25px;
    border-radius: 50%;

    grid-area: color-round;

    justify-self: center;
    align-self: center;
  }

  // .steps__item-title

  &__item-title {
    grid-area: title;

    font-size: 20px;
    color: black;

    @include mq(lg) {
      font-size: 24px;
    }
  }

  // .steps__item-subtitle

  &__item-subtitle {
    grid-area: subtitle;

    font-size: 14px;
    opacity: 0.85;

    @include mq(lg) {
      font-size: 16px;
    }
  }
}
</style>
