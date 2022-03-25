<template>
  <section id="sales" v-editable="story" class="sales">
    <div class="container sales__container">
      <div class="sales__content">
        <h2 class="sales__title">{{ story.title }}</h2>
        <!-- /.sales__title -->
        <ul class="sales__block sale">
          <template v-for="item in story.sales_items">
            <component
              :is="item.component"
              v-if="item.component"
              :key="item.uuid"
              :blok="item"
            />
            <!-- /.sale__item -->
          </template>
        </ul>
        <!-- /.sales__block sale -->
      </div>
      <!-- /.sales__content -->
    </div>
    <!-- /.container sales__container -->
  </section>
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
.sales {
  background: $redMy-900;

  @extend %tpl-section;

  // .sales__container

  &__container {
  }

  // .sales__content

  &__content {
    display: grid;
    grid-auto-flow: row;
    // justify-content: center;
    justify-items: center;
  }

  // .sales__title

  &__title {
    @extend %tpl-section-title;
  }

  // .sales__block

  &__block {
    padding: 0;
    display: grid;
    gap: 20px;
    // grid-template-columns: repeat(2, 1fr);

    @include mq(med) {
      grid-auto-flow: column;
    }
  }
}
</style>
