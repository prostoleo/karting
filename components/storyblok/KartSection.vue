<template>
  <section v-editable="blok">карт</section>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';

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
    };
  },

  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss" scoped></style>
