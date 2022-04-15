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
    const cubeYellowEl = SalesSectionEl.querySelector('.sales__cube--yellow');

    const tlCube = gsap.timeline({
      scrollTrigger: {
        trigger: SalesSectionEl,
        start: 'top 40%',

        toggleActions: 'play reverse play reset',
      },
      ease: 'Power3.easeIn',
    });

    const that = this;

    tlCube
      .to(cubeOrangeEl, {
        xPercent: that.$mq.includes('xl') ? -375 : -355,
        yPercent: that.$mq.includes('xl') ? 375 : 355,
        duration: 0.55,
      })
      .to(
        cubeYellowEl,
        {
          /* xPercent: 350,
          yPercent: -350, */
          xPercent: that.$mq.includes('xl') ? 370 : 350,
          /* xPercent: () => {
            let val = null;

            switch (that.$mq) {
              case 'xl':
              case '2xl':
                val = -370;

                break;
              case '3xl':
              case '4xl':
                val = -360;

                break;

              default:
                val = -350;
                break;
            }

            return val;
          }, */
          /* yPercent: () => {
            let val = null;

            switch (that.$mq) {
              case 'xl':
              case '2xl':
                val = 370;

                break;
              case '3xl':
              case '4xl':
                val = 360;

                break;

              default:
                val = 350;
                break;
            }

            return val;
          }, */
          yPercent: that.$mq.includes('xl') ? -370 : -350,
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

      @include mq(3xl) {
        transform: translate(-225%, 225%);
      }
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
