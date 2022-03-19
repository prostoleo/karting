<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
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

    //* kart icon animation
    gsap.registerPlugin(ScrollTrigger);

    const FaqSectionEl = document.querySelector('section.faq-section');
    const KartIconEl = FaqSectionEl.querySelector('.faq__icon-img');

    const tlKartIcon = gsap.timeline({
      // paused: true,
      scrollTrigger: {
        trigger: FaqSectionEl,
        // start: 'top 20%',
        start: 'top 40%',
        end: 'bottom 90%',
        // end: '+=500',
        markers: true,
        scrub: 0.2,
        // yoyo:
      },
    });

    tlKartIcon
      /* .set('.faq__icon-img', {
        // position: 'absolute',
        // bottom: 0,
        yPercent: 200,
      }) */
      .fromTo(
        KartIconEl,
        {
          // yPercent: 200,
          y: `-${FaqSectionEl.offsetHeight}`,
          duration: 3.5,
          // ease: 'Power1.easeIn()',
        },
        {
          // y: `250`,
          // y: `${KartIconEl.offsetHeight}`,
          y: `${FaqSectionEl.offsetHeight / 3}`,
        }
      );
  },
};
</script>

<template>
  <section class="faq-section">
    <div class="container faq-section__container faq-section__content content">
      <h2 class="content__title">{{ story.title }}</h2>
      <div class="content__faq faq">
        <ul uk-accordion="multiple: true" class="uk-accordion faq__list">
          <li v-for="(item, i) in story.kart_items" :key="i" class="faq__item">
            <a class="uk-accordion-title faq__item-title" href="#">
              <ion-icon src="/tire.svg"></ion-icon>
              <h3>{{ item.summary }}</h3>
            </a>
            <div
              class="uk-accordion-content faq__item-content"
              v-html="richtext(item.details)"
            ></div>
          </li>
        </ul>
        <div class="faq__icon">
          <!-- <ion-icon
            class="faq__icon-img"
            :src="story.kart_img.filename"
          ></ion-icon> -->
          <img class="faq__icon-img" :src="story.kart_img.filename" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.faq-section {
  background: $redMy-800;
  overflow: hidden;

  @extend %tpl-section;

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

  // .faq__item

  &__item {
    background: $orangeMy;
    max-width: var(--max-w);
    width: 100%;

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

  // .faq__icon

  &__icon {
    display: none;
    /* position: absolute;
    right: 0;
    top: 0; */
    width: fit-content;
    justify-self: center;

    @include mq(med) {
      display: block;
    }

    @include mq(lg) {
      // right: unset;
      // left: calc(100% - var(--max-w) / 2);
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
        font-size: 120px;
        width: 120px;
      }
    }
  }
}
</style>
