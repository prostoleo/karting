<template>
  <section ref="sectionHero" v-editable="story" class="hero">
    <!-- <BaseHeader /> -->
    <div class="left-col">
      <div class="container hero__container">
        <!-- <pre> {{ story }} </pre> -->
        <h3 class="hero__subtitle">
          {{ story.subtitle }}
        </h3>
        <h1 class="hero__title">
          {{ story.title }}
        </h1>
        <!-- <p v-html="$md.render(story.description)"></p> -->
        <div
          class="hero__description"
          v-html="richtext(story.description)"
        ></div>
        <!-- <div>{{ richtext(story.description) }}</div> -->
        <!-- <span>{{ richtext('qwerty') }}</span> -->

        <a ref="heroBtn" href="#quiz-section" class="hero__btn hero-cta-btn">
          <span class="">{{ story.cta }}</span>
          <ion-icon
            class="hero-cta__kart"
            src="/kart.svg"
            alt="иконка карта"
            loading="lazy"
          ></ion-icon>
          <ion-icon
            class="hero-cta__kart2"
            src="/kart.svg"
            alt="иконка карта"
            loading="lazy"
          ></ion-icon>
        </a>

        <div class="for-flag-img">
          <img
            class="flag_img drop-shadow drop-shadow-flag"
            :src="`${story.flag_img[0].filename}/m/220x0`"
            width="220"
            height="189"
            :alt="story.flag_img[0].alt"
            loading="lazy"
          />
        </div>
      </div>
    </div>
    <div class="right-col">
      <mq-layout :mq="['sm', '2sm', 'med']">
        <img
          class="right-col__img"
          :src="`${story.hero_bg_img.filename}/m/0x400`"
          height="400"
          :alt="story.hero_bg_img.alt"
        />
      </mq-layout>
      <mq-layout mq="lg" style="height: 100%">
        <img
          class="right-col__img"
          :src="`${story.hero_bg_img.filename}/m/0x550`"
          height="503"
          :alt="story.hero_bg_img.alt"
        />
      </mq-layout>
      <mq-layout mq="xl" style="height: 100%">
        <img
          class="right-col__img"
          :src="`${story.hero_bg_img.filename}/m/0x550`"
          height="550"
          :alt="story.hero_bg_img.alt"
        />
      </mq-layout>
      <mq-layout mq="2xl" style="height: 100%">
        <img
          class="right-col__img"
          :src="`${story.hero_bg_img.filename}/m/0x550`"
          height="575"
          :alt="story.hero_bg_img.alt"
        />
      </mq-layout>
      <mq-layout mq="3xl+" style="height: 100%">
        <img
          class="right-col__img"
          :src="`${story.hero_bg_img.filename}/m/0x550`"
          height="664"
          :alt="story.hero_bg_img.alt"
        />
      </mq-layout>
    </div>
  </section>
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
import { gsap } from 'gsap';
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

  computed: {},

  mounted() {
    //* для обновления контента от storyblok
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));

    //* для анимации кнопки

    const tlButton = gsap.timeline({ paused: true });
    const heroBtnEl = document.querySelector('.hero-cta-btn');

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
    if (this.$mq.match(/med|lg|xl|2xl|3xl|4xl/gm)) {
      const tlKart = gsap.timeline({});
      const kartIconEl = heroBtnEl.querySelector('.hero-cta__kart');

      tlKart
        .set(kartIconEl, {
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
      const tlKart2 = gsap.timeline({});
      const kartIconEl2 = heroBtnEl.querySelector('.hero-cta__kart2');

      tlKart2
        .set(kartIconEl2, {
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
    }
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

      this.tlButton.reverse();
    },
  },
};
</script>

<style lang="scss" scoped>
.hero-cta__kart {
  position: absolute;
  top: 50%;
  left: 0%;

  font-size: 2.5rem;

  display: none;

  @include mq(med) {
    display: block;
  }
}
.hero-cta__kart2 {
  position: absolute;
  top: 50%;
  right: 0%;

  font-size: 2rem;
  opacity: 0.85;

  display: none;

  @include mq(med) {
    display: block;
  }
}

section {
  padding-top: 5rem;
  color: white;
  background: $redMy-900;

  position: relative;
  overflow: hidden;

  --col-gap: 3rem;

  @include mq(lg) {
    padding-top: 0;
    display: flex;
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
        width: 100% !important;
      }
    }
  }

  .right-col {
    --max-h: 400px;
    width: 100%;

    max-height: var(--max-h);

    margin-top: 48px;

    @include mq(lg) {
      margin-top: 0;
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
      // height: 100%;
      height: var(--max-h);
      object-fit: cover;

      aspect-ratio: 16 / 9;

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

  h3.hero__subtitle {
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

  h1.hero__title {
    font-size: 2rem;
    line-height: 120%;
    margin-bottom: 1.125em;

    text-transform: uppercase;

    @include mq(2xl) {
      font-size: 48px;
      margin-bottom: 0.5em;
    }
  }

  .hero__description {
    margin-bottom: 2.5rem;

    p {
      margin: 0 !important;
    }

    @include mq(2xl) {
      & > * {
        font-size: 1.8rem;
      }
    }
  }

  .for-flag-img {
    display: none;
    --flag-width: 220px;
    --flag-width-half: calc(var(--flag-width) / 2);
    --col-gap-minus: calc((var(--col-gap) * -1));

    @include mq(lg) {
      display: block;

      position: absolute;
      right: calc(var(--col-gap-minus) - var(--flag-width-half));
      // right: calc(-3rem - 110px);
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

  a.hero-cta-btn {
    display: inline-block;
    padding: 1rem 36px;

    color: white;
    background: $redMy-500;

    font-size: 16px;
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
  }
}
</style>
