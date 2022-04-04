<template>
  <section id="advantages" v-editable="story" class="advantages">
    <!-- <pre>{{ story }}</pre> -->
    <div class="advantages__content content-advantages">
      <div class="container content-advantages__container">
        <h2 class="content-advantages__title">{{ story.title }}</h2>

        <ul class="content-advantages__wrapper">
          <li v-for="slide in story.slides" :key="slide._uid">
            <!-- class="content-advantages__card card" -->
            <component
              :is="slide.component"
              v-if="slide.component"
              :key="slide._uid"
              :blok="slide"
            />
          </li>
          <!-- /.content-advantages__card card -->
        </ul>
        <!-- /.content-advantages__wrapper -->
        <div class="advantages__bg">
          <img
            :src="`${story.bg_img[0].filename}/m/500x0`"
            :alt="story.bg_img[0].alt"
            class="advantages__bg-img"
          />
        </div>
        <!-- /.advantages__bg -->
      </div>
    </div>
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

  computed: {
    /* srcAdvantagesBg() {
      const advantagesSectionEl = this.$refs.advantagesSection;
      // `${story.bg_img[0].filename}/m/`
      if (advantagesSectionEl) {
        return `${this.story.bg_img[0].filename}/m/0x${advantagesSectionEl.offsetHeight}`;
      }

      return `${this.story.bg_img[0].filename}/m/`;
    }, */
  },

  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },
};
</script>

<style lang="scss" scoped>
.advantages {
  background: $redMy-900;
  position: relative;
  overflow: hidden;

  // ! потом убрать
  border-top: 1px solid white;

  @extend %tpl-section;

  // .advantages__bg

  &__bg {
    position: absolute;
    // top: 0;
    right: -5vw;
    left: -5vw;
    // bottom: 0;
    top: 0;

    z-index: 0;

    /* display: none;

    @include mq(med) {
      display: block;
    } */

    @include mq(lg) {
      max-width: 600px;

      top: unset;
      left: unset;
      right: -5vw;
      // left: -2vw;
      bottom: 0;
    }

    // .advantages__bg-img

    &-img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .content-advantages {
    // .content-advantages__container
    &__container {
    }

    // .content-advantages__title

    &__title {
      @extend %tpl-section-title;
      position: relative;
      z-index: 1;
    }

    // .content-advantages__wrapper

    &__wrapper {
      --min-card-width: 220px;
      --gap: 25px;

      display: grid;
      grid-template-columns: repeat(
        auto-fit,
        minmax(var(--min-card-width), 1fr)
      );
      // grid-auto-rows: 1fr;
      padding: 0;

      gap: var(--gap);
      justify-content: space-between;
      align-content: stretch;

      position: relative;
      z-index: 10;

      @include mq(xl) {
        --gap: 48px;
        --min-card-width: 350px;
      }
    }
  }
}
.card {
  color: white;
  background: $redMy-800;

  box-shadow: $shadowMy;
  padding: 36px 20px;

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
