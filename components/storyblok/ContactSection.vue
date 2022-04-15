<template>
  <section id="contacts" v-editable="story" class="contact">
    <div class="container contact__container">
      <div class="contact__content content">
        <h2 class="content__title">{{ story.title }}</h2>
        <!-- /.content__title -->
        <div class="content__blok">
          <div class="content__info info">
            <template v-for="item in story.contact_items">
              <component
                :is="item.component"
                v-if="item.component"
                :key="item._uid"
                :blok="item"
              />
            </template>
            <!-- /.info__item -->
          </div>
          <!-- /.content__info -->

          <!-- /.content__map -->
        </div>
        <!-- /.content__blok -->
      </div>
      <!-- /.contact__content content -->
    </div>
    <!-- /.container contact__container -->
    <div class="contact__map">
      <iframe
        ref="iframeMap"
        class="lazy"
        data-src="https://yandex.ru/map-widget/v1/?um=constructor%3A4877ddf58de7e1312e2ae71f27c5288055568326f513e60eba0bc2fdbaec5cd4&amp;source=constructor"
        title="Мы на карте"
        width="100%"
        height="500"
        frameborder="0"
      ></iframe>
      <!-- loading="lazy" -->
    </div>
  </section>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import LazyLoad from 'vanilla-lazyload';
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

    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({
      thresholds: '250% 0px 0px 0px',
      unobserve_entered: true,
    });
  },
};
</script>

<style lang="scss" scoped>
.contact {
  color: black;

  @extend %tpl-section;
  --section-pb: 0;

  display: grid;
  gap: 35px;

  @include mq(xl) {
    grid-auto-flow: column;
    --section-pt: 0;
  }

  // .contact__container

  &__container {
  }

  // .contact__content

  &__content {
  }
}
.container {
}
.content {
  @include mq(xl) {
    padding-top: 50px;
  }

  // .content__title

  &__title {
    @extend %tpl-section-title;
    color: black;
  }

  // .content__blok

  &__blok {
    margin: 0 auto;
    width: fit-content;
  }

  // .content__info

  &__info {
    max-width: 440px;

    display: grid;
    gap: 15px;

    padding: 40px 15px;

    background: $redMy-300;
  }
}
</style>
