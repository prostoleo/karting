<script>
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { useStoryblokBridge, useStoryblokApi } from '@storyblok/nuxt';
import gsap from 'gsap/all';
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
      duration: 0.25,
      tlButton: null,
      tlKart: null,
      tlKart2: null,
    };
  },
  mounted() {
    //* для обновления контента от storyblok
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));

    //* для анимации кнопки
    const tlButton = gsap.timeline({ paused: true });
    const heroBtnEl = this.$refs.heroBtn;
    console.log('heroBtnEl: ', heroBtnEl);

    tlButton
      .to(heroBtnEl, {
        transformOrigin: 'center center',
        duration: 0.25,
        scale: 1.15,
      })
      .to(heroBtnEl.querySelector('span'), {
        xPercent: 170,
      });

    this.tlButton = tlButton;

    //* для анимации карта
    // const tlKart = gsap.timeline({ paused: true });
    const tlKart = gsap.timeline({});
    const kartIconEl = heroBtnEl.querySelector('.hero-cta__kart');

    tlKart
      .set(kartIconEl, {
        // opacity: 0,
        x: -100,
        yPercent: -50,
        scaleX: -1,
      })
      .to(kartIconEl, {
        x: 410,
        duration: 1.45,
        repeat: -1,
        repeatDelay: 0.55,
      });

    this.tlKart = tlKart;

    //* для анимации карта2
    // const tlKart2 = gsap.timeline({ paused: true });
    const tlKart2 = gsap.timeline({});
    const kartIconEl2 = heroBtnEl.querySelector('.hero-cta__kart2');

    tlKart2
      .set(kartIconEl2, {
        // opacity: 0,
        x: 100,
        yPercent: -50,
        scaleX: 1,
      })
      .to(kartIconEl2, {
        x: -410,
        duration: 2.15,
        repeat: -1,
        repeatDelay: 0.75,
      });

    this.tlKart2 = tlKart2;

    //* для анимации
  },
  methods: {
    animateBtnForward() {
      this.tlButton.play();

      setTimeout(() => {
        this.tlKart.play();
        this.tlKart2.play();
      }, this.duration * 1000);
    },

    animateBtnBackward() {
      this.tlKart.restart();
      this.tlKart2.restart();
      // this.tlKart.pause();
      // this.tlKart2.pause();

      this.tlButton.reverse();
    },
  },
};
</script>

<template>
  <section v-editable="story" class="hero">
    <!-- <BaseHeader /> -->
    <div class="left-col">
      <div class="container hero__container">
        <!-- <pre> {{ story }} </pre> -->
        <h3 class="">
          {{ story.subtitle }}
        </h3>
        <h1 class="">
          {{ story.title }}
        </h1>
        <!-- <p v-html="$md.render(story.description)"></p> -->
        <div v-html="richtext(story.description)" class="description"></div>
        <!-- <div>{{ richtext(story.description) }}</div> -->
        <!-- <span>{{ richtext('qwerty') }}</span> -->

        <button ref="heroBtn" class="hero-cta-btn">
          <!-- @mouseenter="animateBtnForward" -->
          <!-- @mouseleave="animateBtnBackward" -->
          <span class="">{{ story.cta }}</span>
          <ion-icon class="hero-cta__kart" src="/kart.svg"></ion-icon>
          <ion-icon class="hero-cta__kart2" src="/kart.svg"></ion-icon>
        </button>

        <div class="for-flag-img">
          <img
            class="flag_img drop-shadow drop-shadow-flag"
            :src="`${story.flag_img[0].filename}/m/`"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="right-col">
      <img
        class="right-col__img"
        :src="`${story.hero_bg_img.filename}/m/`"
        alt=""
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero-cta__kart {
  position: absolute;
  top: 50%;
  left: 0%;

  font-size: 2.5rem;
}
.hero-cta__kart2 {
  position: absolute;
  top: 50%;
  right: 0%;

  font-size: 2rem;
  opacity: 0.85;
}

section {
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding-top: 5rem;
  color: white;
  background: $redMy-900;

  position: relative;
  overflow: hidden;

  --col-gap: 3rem;

  @include mq(lg) {
    padding-top: 0;

    flex-direction: row;
    align-items: stretch;
    gap: var(--col-gap);
  }

  @include mq(xl) {
    max-height: 550px;
  }

  @include mq(3xl) {
    max-height: 664px;
  }

  --transition-dur: 550ms;

  .left-col {
    position: relative;

    --left-pt: 6rem;
    --left-pb: 4rem;

    @include mq(lg) {
      flex: 0 1 39%;
      padding-top: var(--left-pt);
      padding-bottom: var(--left-pb);

      margin-left: 5%;
      transition: flex-basis var(--transition-dur) ease-in;
    }

    @include mq(xl) {
      --left-pt: 8rem;
      --left-pb: 8rem;
    }

    @include mq(3xl) {
      --left-pt: 10rem;
      --left-pb: 10rem;
    }

    .hero__container {
      @include mq(lg) {
        margin: 0;
        width: 100%;
      }
    }
  }

  .right-col {
    --max-h: 400px;

    max-height: var(--max-h);
    @include mq(lg) {
      flex: 1 0 45%;
      --max-h: 503px;

      overflow: hidden;

      transition: flex-basis var(--transition-dur) ease-in;

      &:hover {
        flex-basis: 54%;
        transition: flex-basis var(--transition-dur) ease-in;
      }
    }

    @include mq(xl) {
      flex: 1 0 50%;

      --max-h: 550px;

      &:hover {
        flex-basis: 58%;
        transition: flex-basis var(--transition-dur) ease-in;
      }
    }

    @include mq(2xl) {
      --max-h: 575px;
    }

    @include mq(3xl) {
      --max-h: 664px;
    }

    .right-col__img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;

      transition: all 200ms ease-in;

      @include mq(med) {
        object-position: center -100px;
      }

      @include mq(lg) {
        object-position: unset;
        // transition: all var(--transition-dur) ease-in
        //   calc(var(--transition-dur) / 2);
        transition: all calc(var(--transition-dur) / 2) ease-in
          var(--transition-dur);
      }

      &:hover {
        transform: scale(1.075);
      }
    }
  }

  h3 {
    margin-bottom: 0.6em;

    font-size: 20px;
    font-weight: 500;
    line-height: 125%;
    letter-spacing: 0.2em;

    color: $orangeMy;

    @include mq(2xl) {
      font-size: 24px;
    }
  }

  h1 {
    font-size: 2rem;
    line-height: 120%;
    margin-bottom: 1.125em;

    text-transform: uppercase;

    @include mq(2xl) {
      font-size: 48px;
      margin-bottom: 0.5em;
    }
  }

  .description {
    margin-bottom: 2.5rem;

    @include mq(2xl) {
      & > * {
        font-size: 1.8rem;
      }
    }
  }

  .for-flag-img {
    display: none;
    --flag-width: 220px;

    @include mq(lg) {
      display: block;

      position: absolute;
      right: calc((var(--col-gap) * -1) - (var(--flag-width) / 2));
      top: 30%;
      max-width: var(--flag-width);
      z-index: 5;

      transition: all 250ms ease-in;
    }
    img.flag_img {
      display: block;
      filter: $flag-shadow;
    }
  }

  button.hero-cta-btn {
    padding: 1rem 36px;

    color: white;
    background: $redMy-500;

    font-family: 'Arimo', sans-serif;
    font-weight: 600;
    line-height: 100%;

    position: relative;
    overflow: hidden;

    transform-origin: center center;
    transition: all 150ms ease-in-out;

    span {
      display: block;
      transform: translateY(-1px);

      @include mq(xl) {
        font-size: 24px;
      }
    }

    &:hover,
    &:focus {
      outline: 2px solid $orangeMy;
      outline-offset: 2px;

      transform: scale(1.075);
      transition: all 150ms ease-in-out;
    }

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0%;
      bottom: 0%;

      width: 4rem;
      height: 4px;

      transform-origin: center center;

      background: linear-gradient(to right, #f2709c, #ff9472);
      z-index: 5;
      transform: rotate(-65deg);

      display: none;

      // animation: bright-line 1200ms ease-in 150ms infinite forwards;
    }

    &::after {
      right: 0%;
      top: 0%;
      left: unset;
      bottom: unset;

      background: linear-gradient(to right, #232526, #414345);
      transform: rotate(-45deg);
      animation: none;
    }
  }
}

@keyframes bright-line {
  from {
    transform: translate(-1rem, 2rem) rotate(-37deg);
  }

  to {
    transform: translate(10rem, -5rem) rotate(-37deg);
  }
}
</style>
