<template>
  <section id="questions" v-editable="story" class="faq-section">
    <div class="container faq-section__container faq-section__content">
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
          <img
            class="faq__icon-img"
            :src="`${story.kart_img.filename}/m/100x0`"
            width="100"
            :alt="story.kart_img.alt"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    console.log('FaqSectionEl: ', FaqSectionEl);
    const KartIconEl = FaqSectionEl.querySelector('.faq__icon');

    console.log(`this.$mq.includes('xl'): `, this.$mq.includes('xl'));
    const startPos = this.$mq.includes('xl') ? 'top -30%' : 'top center';

    if (KartIconEl) {
      const tlKartIcon = gsap.timeline({
        scrollTrigger: {
          trigger: FaqSectionEl,
          start: startPos,
          scrub: true,
        },
      });
      tlKartIcon.fromTo(
        KartIconEl,
        {
          yPercent: this.$mq.includes('xl') ? -250 : -550,
        },
        {
          yPercent: this.$mq.includes('xl') ? 270 : 320,
        }
      );
    }
  },
};
</script>

<style lang="scss" scoped>
.faq-section {
  background: $redMy-800;
  overflow: hidden;
  min-height: 550px;

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

    list-style: none;

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
      aspect-ratio: 20 / 27;

      color: white;

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
