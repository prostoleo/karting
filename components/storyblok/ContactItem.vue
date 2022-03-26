<template>
  <a v-editable="story" :href="hrefComp" class="info__item">
    <ion-icon :src="story.icon.filename" class="info__item-icon"></ion-icon>
    <span class="info__item-text">{{ story.text }}</span>
  </a>
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
      story: this.blok,
      richtext,
    };
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    hrefComp() {
      if (this.story.type === 'mail') {
        return `mailto:${this.story.text}`;
      }

      if (this.story.type === 'phone') {
        return `tel:${this.story.text}`;
      }

      if (this.story.type === 'address') {
        return `https://yandex.ru/maps/35/krasnodar/?from=mapframe&ll=39.054265%2C45.034285&mode=usermaps&source=mapframe&um=constructor%3A4877ddf58de7e1312e2ae71f27c5288055568326f513e60eba0bc2fdbaec5cd4&utm_source=mapframe&z=13`;
      }
    },
  },

  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss" scoped>
.info {
  // .info__item

  &__item {
    color: white;

    display: grid;
    grid-auto-flow: column;
    align-content: center;
    justify-content: flex-start;

    gap: 15px;

    @include mq(xl) {
      gap: 35px;
    }
  }

  // .info__item-icon

  &__item-icon {
    font-size: 25px;
    color: white;
  }

  // .info__item-text

  &__item-text {
    color: black;
    font-weight: 500;
  }
}
</style>
