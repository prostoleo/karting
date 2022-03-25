<template>
  <li v-editable="story" class="sale__item">
    <img :src="story.icon.filename" alt="" class="sale__item-icon" />
    <div class="sale__item-content" v-html="richtext(story.text)"></div>
    <!-- /.sale__item-content -->
  </li>
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

  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss" scoped>
.sale {
  // .sale__item

  &__item {
    max-width: 350px;
    padding: 40px 20px;

    background: $redMy-800;
    box-shadow: $shadowMy;
  }

  // .sale__item-icon

  &__item-icon {
    margin-bottom: 20px;
  }

  // .sale__item-content

  &__item-content {
  }
}
</style>

<style>
span.redMy-500 {
  font-weight: bold;
  color: red;
}
</style>
