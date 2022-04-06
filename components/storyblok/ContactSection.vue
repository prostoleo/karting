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
      <!-- <a href="https://yandex.ru/maps/?um=constructor%3A4877ddf58de7e1312e2ae71f27c5288055568326f513e60eba0bc2fdbaec5cd4&amp;source=constructorStatic" target="_blank"><img src="https://api-maps.yandex.ru/services/constructor/1.0/static/?um=constructor%3A4877ddf58de7e1312e2ae71f27c5288055568326f513e60eba0bc2fdbaec5cd4&amp;width=600&amp;height=450&amp;lang=ru_RU" alt="" style="border: 0;" /></a> -->
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

    /* const mapEl = this.$refs.iframeMap;

    mapEl.setAttribute('src', mapEl.dataset.src);
    mapEl.removeAttribute('data-src'); */
    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({
      callback_enter: this.callback_enter,
      callback_exit: this.callback_exit,
      callback_cancel: this.callback_cancel,
      callback_loading: this.callback_loading,
      callback_loaded: this.callback_loaded,
      callback_error: this.callback_error,
      callback_finish: this.callback_finish,
    });
  },

  methods: {
    logElementEvent(eventName, element) {
      console.log(Date.now(), eventName, element.getAttribute('data-src'));
    },

    callback_enter(element) {
      this.logElementEvent('🔑 ENTERED', element);
    },
    callback_exit(element) {
      this.logElementEvent('🚪 EXITED', element);
    },
    callback_loading(element) {
      this.logElementEvent('⌚ LOADING', element);
    },
    callback_loaded(element) {
      this.logElementEvent('👍 LOADED', element);
    },
    callback_error(element) {
      this.logElementEvent('💀 ERROR', element);
      element.src =
        'https://via.placeholder.com/440x560/?text=Error+Placeholder';
    },
    callback_finish() {
      this.logElementEvent('✔️ FINISHED', document.documentElement);
    },
    callback_cancel(element) {
      this.logElementEvent('🔥 CANCEL', element);
    },
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
