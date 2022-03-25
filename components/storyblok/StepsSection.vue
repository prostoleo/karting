<template>
  <section id="steps" v-editable="story" class="steps-section">
    <div class="container steps-section__container">
      <div class="steps-section__content content">
        <div class="content__text">
          <h2 class="content__title">
            {{ story.title }}
            <!-- @mouseleave="playLottie" -->
          </h2>
          <div class="content__block block-content">
            <div class="block-content__steps steps">
              <!--  -->
              <!-- <ion-icon
                :src="story.road_svg.filename"
                class="steps__svg"
              ></ion-icon> -->
              <!-- <img :src="story.road_svg.filename" class="steps__svg" /> -->
              <svg
                id="road-icon"
                class="steps__svg"
                width="597"
                height="586"
                viewBox="0 0 597 586"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M326.364 15C326.364 15 -31.5 47.5 77.9998 136C162 195 595 137.5 595 248.5C595 359.5 -35.5 258.5 77.9998 345.854C183.5 398 595 360.354 595 455.354C595 550.355 326.364 584 326.364 584"
                  stroke="black"
                  stroke-opacity="0.25"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M250.364 2C250.364 2 2 18.8545 2 126.854C2 234.854 496 138.5 500 238.854C487.5 332.854 2 223.354 2 332.854C2 442.354 500 361 500 456C500 551 247 554 247 554"
                  stroke="black"
                  stroke-opacity="0.25"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <template v-for="step in story.step_items">
                <component
                  :is="step.component"
                  v-if="step.component"
                  :key="step._uid"
                  :blok="step"
                />
              </template>
              <!-- /.steps__item -->
            </div>

            <lottie-player
              id="lottiePlayer"
              class="block-content__lottie"
              src="https://assets10.lottiefiles.com/packages/lf20_clmd2mj6.json"
              background="transparent"
              speed="0.65"
              style="width: 300px; height: 300px"
            ></lottie-player>
          </div>
        </div>
      </div>
      <!-- /.sales__content -->
    </div>
    <!-- /.container sales__container -->
    <div class="steps-section__photo">
      <img
        :src="`${story.karts_photo.filename}/m/`"
        alt=""
        class="steps-section__photo-img"
      />
    </div>
    <!-- /.steps-section__photo -->
  </section>
</template>

<script>
/* eslint-disable import/default */
import { useStoryblokBridge } from '@storyblok/nuxt';

// import lottierPlayer from '@lottiefiles/lottie-player';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { richtext } from '~/utils/storyblok/storyblok.js';

export default {
  /* components: {
    lottierPlayer,
  }, */

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

      lottieEl: null,
    };
  },

  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));

    const lottiePlayerEl = document.querySelector('#lottiePlayer');

    this.lottieEl = lottiePlayerEl;

    //* animation lottie +
    gsap.registerPlugin(ScrollTrigger);
    const StepsSectionEl = document.querySelector('section.steps-section');

    const that = this;

    gsap.timeline({
      // paused: true,
      scrollTrigger: {
        trigger: StepsSectionEl,
        start: 'top 30%',
        end: `+=${StepsSectionEl.offsetHeight}`,

        onEnter() {
          that.lottieEl.play();
        },
        onEnterBack() {
          that.lottieEl.play();
        },

        onLeave() {
          that.lottieEl.stop();
        },
        onLeaveBack() {
          that.lottieEl.stop();
        },
      },
    });

    // =================
    // todo road icon animation
    const stepsSvgEl = document.querySelector('.steps__svg');
    // const svgEl = stepsSvgEl.querySelector('.icon-inner');
    const pathsEls = Array.from(stepsSvgEl.querySelectorAll('path'));
    // console.log('pathsEls: ', pathsEls);

    //* target element for Intersection
    const sectionEl = document.getElementById('steps');
    // console.log('sectionEl: ', sectionEl);

    //* получаем длинну каждого path
    const pathsLength = pathsEls.map((path) => path.getTotalLength());
    // console.log('pathsLength: ', pathsLength);

    //* обнуляем длины path
    function pathToZero() {
      pathsEls.forEach((pathEl, i) => {
        pathEl.style.strokeDasharray = pathsLength[i] + ' ' + pathsLength[i];
        pathEl.style.strokeDashoffset = pathsLength[i];
      });
    }

    //* функция для получения массива входов
    function getThresholdArray(min, max, percent) {
      const arr = [];

      const diff = max - min;
      const share = percent / 100;
      const n = Math.round(diff / share);

      let curNum = min;

      for (let i = 0; i < n; i++) {
        arr.push(curNum);

        curNum = parseFloat((curNum + share).toFixed(2));
        // console.log('curNum: ', curNum);

        //* если превысили максимальное значение - выходим из цикла
        if (curNum >= max) {
          break;
        }
      }

      return arr;
    }

    //* intersectionObserver
    const options = {
      root: null,
      rootMargin: '-5%',
      threshold: getThresholdArray(0.1, 1, 5),
    };

    const handlerObserver = (entries, observer) => {
      // console.log('entries: ', entries);
      // console.log('observer: ', observer);

      // if (entries[0].isIntersecting && entries[0].intersectionRatio > 0.3) {
      if (entries[0].isIntersecting && entries[0].intersectionRatio > 0) {
        pathsEls.forEach((pathEl, i) => {
          const drawLength = entries[0].intersectionRatio * pathsLength[i];

          pathEl.style.strokeDashoffset = pathsLength[i] - drawLength;
        });
      } else {
        pathToZero();
      }
    };

    const observer = new IntersectionObserver(handlerObserver, options);

    // observer.observe(sectionEl.querySelector('.block-content'));
    observer.observe(sectionEl.querySelector('#lottiePlayer'));
  },

  methods: {
    playLottie() {
      this.lottieEl.play();
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-section {
  @extend %tpl-section;

  --section-pb: 0px;

  color: black;
  overflow: hidden;

  @include mq(lg) {
    display: flex;
    flex-direction: row-reverse;

    --section-pt: 0px;
    --section-pb: 0px;
    // align-items: center;
  }

  // .steps-section__container

  &__container {
    margin-bottom: 44px;

    @include mq(lg) {
      margin-bottom: 0;

      align-self: center;
    }
  }

  // .steps-section__content

  &__content {
    @include mq(lg) {
      padding: 60px 15px;
    }
  }

  // .steps-section__photo

  &__photo {
    @include mq(lg) {
      flex: 0 1 45%;
    }

    // .steps-section__photo-img

    &-img {
      display: block;
      height: 100%;

      object-fit: cover;
      object-position: 30% center;

      filter: grayscale(100%);
      transform: scale(1, 1);
      transition: transform 150ms ease-in, filter 150ms ease-in 150ms;

      &:hover {
        filter: grayscale(0);
        transform: scale(1.075, 1.075);

        transition: filter 150ms ease-in, transform 150ms ease-in 150ms;
      }
    }
  }
}
.content {
  // .content__text

  &__text {
    display: grid;
    justify-items: center;
  }

  // .content__title

  &__title {
    @extend %tpl-section-title;
    width: max-content;
    color: black;
  }

  // .content__block

  &__block {
    display: grid;
    justify-items: center;

    width: 100%;
  }
}
.block-content {
  // .block-content__steps

  &__steps {
    display: grid;
    gap: 20px;

    justify-content: center;

    max-width: 900px;
  }

  // .block-content__lottie

  &__lottie {
    display: none;

    @include mq(lg) {
      display: block;
    }
  }
}
.steps {
  @include mq(lg) {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, auto);
    gap: 20px 120px;

    justify-content: space-between;

    position: relative;
  }

  @include mq(xl) {
    grid-template-rows: repeat(4, min-content);
    gap: 0 120px;

    grid-template-areas:
      'first .'
      '. second'
      'third .'
      '. fourth';
  }

  // .content__svg

  &__svg {
    display: none;

    // font-size: 200px;

    @include mq(xl) {
      display: block;

      color: black;

      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;

      width: 100%;
      // height: 100%;
      height: auto;

      max-width: 600px;

      transform: translate(-50%, 0);
    }

    @include mq(xl) {
    }
  }
}
</style>
