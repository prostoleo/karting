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
      <div class="sales__cube sales__cube--orange"></div>
      <!-- /.sales__cube sales__cube--orange -->
      <div class="sales__cube sales__cube--yellow"></div>
      <!-- /.sales__cube sales__cube--yellow -->
    </div>
    <!-- /.container sales__container -->
  </section>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

      tlCube: null,
    };
  },

  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));

    //* stripe anim
    gsap.registerPlugin(ScrollTrigger);
    const SalesSectionEl = document.querySelector('section.sales');
    const cubeOrangeEl = SalesSectionEl.querySelector('.sales__cube--orange');
    // const CubeOrangeEl = SalesSectionEl.querySelector('.sales__cube--orange');
    const cubeYellowEl = SalesSectionEl.querySelector('.sales__cube--yellow');

    // eslint-disable-next-line no-unused-vars
    const that = this;

    const tlCube = gsap.timeline({
      // paused: true,
      scrollTrigger: {
        trigger: SalesSectionEl,
        // start: 'top 20%',
        //* работает
        // start: 'top 40%',
        //* работает
        // end: 'bottom 90%',
        start: 'top 80%',
        // end: 'bottom 80%',
        // end: '+=500',
        markers: true,

        toggleActions: 'play play play reset',
      },
      ease: 'Power3.easeIn',
    });

    tlCube
      /* .set(StripeOrangeEl, {
        x: 150,
        y: -150,
        duration: 0.35,
      })
      .set(StripeYellowEl, {
        x: -150,
        y: 150,
        duration: 0.35,
      }) */
      .to(cubeOrangeEl, {
        xPercent: -350,
        yPercent: 350,
        duration: 0.55,
      })
      .to(
        cubeYellowEl,
        {
          xPercent: 350,
          yPercent: -350,
          duration: 0.55,
        },
        '<0.15'
      );

    this.tlCube = tlCube;
  },
};
</script>

<style lang="scss" scoped>
.sales {
  background: $redMy-900;

  @extend %tpl-section;

  overflow: hidden;

  // .sales__container

  &__container {
    position: relative;
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

  // .sales__stripe

  &__stripe {
    --stripe-h: 5px;
    position: absolute;
    min-width: 360px;
    width: 50vmin;
    max-width: 500px;
    height: var(--stripe-h);
    background: white;
    top: 0%;
    left: 0%;

    transform-origin: center center;
    // transform: rotate(-45deg) translateX(-17%) translateY(-70px);

    &--orange {
      background: $orangeMy;
      transform: rotate(-45deg) translateX(160px) translateY(-150px);
    }

    &--yellow {
      background: $yellowMy;
      top: calc(0% + var(--stripe-h));
      left: calc(0% + var(--stripe-h));
      transform: rotate(-45deg) translateX(-520px) translateY(-150px);
    }
  }

  &__cube {
    width: 200px;
    height: 200px;

    // border-left: 1px solid transparent;
    // border-top: 1px solid transparent;
    // border-right: 1px solid $orangeMy;

    top: 0;
    left: 0;
    position: absolute;

    &--orange {
      background: linear-gradient(
        to bottom right,
        transparent calc(50% - 2px),
        $orangeMy calc(50% - 2px),
        $orangeMy calc(50% + 2px),
        transparent 50%
      );
      transform: translate(150%, -150%);
    }

    &--yellow {
      top: 5px;
      left: 5px;
      background: linear-gradient(
        to bottom right,
        transparent calc(50% - 2px),
        $yellowMy calc(50% - 2px),
        $yellowMy calc(50% + 2px),
        transparent 50%
      );

      transform: translate(-150%, 150%);
    }

    /* &::before {
      content: '';
      position: absolute;

      top: 0;
      right: 0;

      width: 100%;
      height: 3px;

      background: red;
      transform-origin: 50% 50%;

      transform: rotate(-45deg);
    } */
  }
}
</style>
