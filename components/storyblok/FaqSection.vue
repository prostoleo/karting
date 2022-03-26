<template>
  <section id="questions" v-editable="story" class="faq-section">
    <div class="container faq-section__container faq-section__content content">
      <h2 class="content__title">{{ story.title }}</h2>
      <div class="content__faq faq">
        <ul uk-accordion="multiple: true" class="faq__list">
          <template v-for="item in story.kart_items">
            <component
              :is="item.component"
              v-if="item.component"
              :key="item._uid"
              :blok="item"
            />
          </template>
        </ul>
        <div class="faq__icon">
          <img class="faq__icon-img" :src="story.kart_img.filename" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import FaqItem from '~/components/storyblok/FaqItem.vue';
import { richtext } from '~/utils/storyblok/storyblok.js';

export default {
  components: { FaqItem },
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

    //* kart icon animation
    gsap.registerPlugin(ScrollTrigger);
    const FaqSectionEl = document.querySelector('section.faq-section');
    const KartIconEl = FaqSectionEl.querySelector('.faq__icon-img');
    const tlKartIcon = gsap.timeline({
      // paused: true,
      scrollTrigger: {
        trigger: FaqSectionEl,
        // start: 'top 20%',
        //* работает
        // start: 'top 40%',
        //* работает
        // end: 'bottom 90%',
        start: 'top 60%',
        end: 'bottom 80%',
        // end: '+=500',
        markers: true,
        // scrub: 0.2,
        scrub: true,
        // yoyo:
      },
    });
    tlKartIcon.fromTo(
      KartIconEl,
      {
        // yPercent: 200,
        // y: `-${FaqSectionEl.offsetHeight}`,
        yPercent: -500,
        // duration: 3.5,
        // ease: 'Power1.easeIn()',
      },
      {
        // y: `250`,
        // y: `${KartIconEl.offsetHeight}`,
        // y: `${FaqSectionEl.offsetHeight / 2.25}`,
        yPercent: 320,
      }
    );
  },
};
</script>

<style lang="scss" scoped>
.faq-section {
  background: $redMy-800;
  overflow: hidden;
  // min-height: 550px;

  @extend %tpl-section;

  --section-pb: 90px;

  // .faq-section__container

  &__container {
  }

  // .faq-section__content

  &__content {
  }
}
.content {
  // .content__title

  &__title {
    @extend %tpl-section-title;
  }

  // .content__faq

  &__faq {
  }
}
.faq {
  --padding-inner: 14px;
  --transition-dur: 150ms;
  --max-w: 500px;

  position: relative;

  @include mq(med) {
    display: grid;
    grid-template-columns: var(--max-w) auto;
    grid-auto-flow: column;
    // align-content: flex-start;
    align-items: flex-end;
  }

  @include mq(xl) {
    display: block;
  }

  // .faq__list

  &__list {
    display: grid;
    gap: 20px;

    margin: 0 auto;
    max-width: var(--max-w);
    width: 100%;

    @include mq(med) {
      margin: 0 auto 0 0;
    }

    @include mq(xl) {
      max-width: unset;

      grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
      align-items: flex-start;

      gap: 20px 140px;
    }
  }

  // .faq__icon

  &__icon {
    display: none;
    width: fit-content;
    justify-self: center;

    @include mq(med) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @include mq(xl) {
      position: absolute;
      left: 50%;
      top: 0;

      transform: translate(-50%, 0);
    }

    // .faq__icon-img

    &-img {
      object-fit: contain;
      font-size: 80px;
      width: 80px;

      position: relative;
      z-index: 7;

      @include mq(lg) {
        font-size: 100px;
        width: 100px;
      }

      @include mq(xl) {
        // font-size: 120px;
        // width: 120px;
      }
    }
  }
}
</style>
