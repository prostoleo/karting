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
  <li v-editable="story" class="faq__item">
    <a class="uk-accordion-title faq__item-title" href="#">
      <ion-icon src="/tire.svg"></ion-icon>
      <h3>{{ story.summary }}</h3>
    </a>
    <div
      class="uk-accordion-content faq__item-content"
      v-html="richtext(story.details)"
    ></div>
  </li>
</template>

<style lang="scss" scoped>
.faq {
  --padding-inner: 14px;
  --transition-dur: 150ms;
  --max-w: 500px;

  // .faq__item

  &__item {
    background: $orangeMy;
    max-width: var(--max-w);
    width: 100%;

    @include mq(xl) {
      max-width: unset;
    }

    &.uk-open {
      ion-icon {
        transform: rotate(90deg);
        transition: transform var(--transition-dur) ease-in;
      }
    }
  }

  // .faq__item-title

  &__item-title {
    padding: var(--padding-inner);

    cursor: pointer;

    display: grid;
    align-items: center;
    justify-content: flex-start;
    grid-auto-flow: column;

    gap: 10px;

    ion-icon {
      font-size: 30px;

      transform: rotate(0deg);
      transition: transform var(--transition-dur) ease-in;
    }

    h3 {
      color: $redMy-900;
      font-size: 20px;
      font-weight: 700;

      @include mq(lg) {
        font-size: 24px;
      }
    }

    &:hover,
    &:focus {
      outline: 2px solid $redMy-400;
    }

    &::before {
      display: none;
    }
  }

  // .faq__item-content

  &__item-content {
    padding: var(--padding-inner);

    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;

    color: black;
    background: white;

    @include mq(med) {
      font-size: 16px;
    }
  }
}
</style>
