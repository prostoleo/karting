<template>
  <section
    id="karts"
    v-editable="story"
    class="karts"
    :style="`background-image: url(${story.bg_img.filename}/m/); background-repeat: repeat; background-size: 80px auto; background-blend-mode: screen`"
  >
    <div class="container karts__container">
      <h2 class="karts__title">{{ story.title }}</h2>
      <!-- /.karts__title -->

      <div class="karts__content">
        <div uk-slider>
          <div class="uk-position-relative">
            <div class="uk-slider-container uk-light">
              <!--  -->
              <!-- uk-child-width-1-4@m  -->
              <ul
                class="uk-child-width-1-2 uk-child-width-1-3@s uk-slider-items"
              >
                <template v-for="slide in story.slides">
                  <li
                    :key="slide._uid"
                    class="slider__item slide"
                    tabindex="-1"
                  >
                    <div class="slide__inner">
                      <div class="slide__front">
                        <img
                          :src="`${slide.kart_img.filename}/m/`"
                          alt=""
                          class="slide__front-img"
                        />
                        <!-- <div class="slide__front-footer">
                      <button class="btn slide__front-btn">Подробнее</button>
                    </div> -->
                        <!-- /.slide__front-footer -->
                      </div>
                      <!-- /.slide__front -->
                      <div class="slide__back back">
                        <h3 class="back__title">
                          {{ slide.title }}
                        </h3>
                        <div class="back-row">
                          <span class="back__name">Тип:</span>
                          <p class="back__desc">{{ slide.type }}</p>
                        </div>
                        <!-- /.slide__back-row -->
                        <div class="back-row">
                          <span class="back__name">Резина:</span>
                          <p class="back__desc">{{ slide.tire }}</p>
                        </div>
                        <!-- /.slide__back-row -->
                        <div class="back-row">
                          <span class="back__name">Тормоза:</span>
                          <p class="back__desc">{{ slide.brakes }}</p>
                        </div>
                        <!-- /.slide__back-row -->
                        <div class="back-row">
                          <span class="back__name">Двигатель:</span>
                          <p class="back__desc">{{ slide.engine }}</p>
                        </div>
                        <!-- /.slide__back-row -->
                        <div class="back-row">
                          <span class="back__name">Вес:</span>
                          <p class="back__desc">{{ slide.weight }}</p>
                        </div>
                        <!-- /.slide__back-row -->
                        <div
                          v-html="richtext(slide.description)"
                          class="back-row"
                        ></div>
                        <!-- /.slide__back-row -->
                        <!-- <button class="btn slide__back-btn">Назад</button> -->
                        <!-- /.btn slide__back-btn -->
                      </div>
                      <!-- /.slide__back -->
                    </div>
                  </li>
                </template>
              </ul>
            </div>

            <div class="uk-hidden@s uk-light">
              <a
                class="uk-position-center-left uk-position-small"
                href="#"
                uk-slidenav-previous
                uk-slider-item="previous"
              ></a>
              <a
                class="uk-position-center-right uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
              ></a>
            </div>

            <div class="uk-visible@s">
              <a
                class="uk-position-center-left-out uk-position-small"
                href="#"
                uk-slidenav-previous
                uk-slider-item="previous"
              ></a>
              <a
                class="uk-position-center-right-out uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
              ></a>
            </div>
          </div>

          <ul class="uk-slider-nav uk-dotnav uk-flex-center"></ul>
        </div>
      </div>
      <!-- /.karts__content -->
    </div>
    <!-- /.container karts__container -->
  </section>
</template>

<script>
/* eslint-disable no-new */
import { useStoryblokBridge } from '@storyblok/nuxt';

// import Glider from 'glider-js/glider';
// import 'glider-js/glider.min.css';
import { richtext } from '~/utils/storyblok/storyblok.js';

/* <div class="glider-contain karts__slider slider">
          <ul class="glider slider__list">
            <template v-for="slide in story.slides">
              <li :key="slide._uid" class="slider__item slide" tabindex="1">
                <div class="slide__inner">
                  <div class="slide__front">
                    <img
                      :src="`${slide.kart_img.filename}/m/`"
                      alt=""
                      class="slide__front-img"
                    />
                    <!-- <div class="slide__front-footer">
                      <button class="btn slide__front-btn">Подробнее</button>
                    </div> -->
                    <!-- /.slide__front-footer -->
                  </div>
                  <!-- /.slide__front -->
                  <div class="slide__back back">
                    <h3 class="back__title">
                      {{ slide.title }}
                    </h3>
                    <div class="back-row">
                      <span class="back__name">Тип:</span>
                      <p class="back__desc">{{ slide.type }}</p>
                    </div>
                    <!-- /.slide__back-row -->
                    <div class="back-row">
                      <span class="back__name">Резина:</span>
                      <p class="back__desc">{{ slide.tire }}</p>
                    </div>
                    <!-- /.slide__back-row -->
                    <div class="back-row">
                      <span class="back__name">Тормоза:</span>
                      <p class="back__desc">{{ slide.brakes }}</p>
                    </div>
                    <!-- /.slide__back-row -->
                    <div class="back-row">
                      <span class="back__name">Двигатель:</span>
                      <p class="back__desc">{{ slide.engine }}</p>
                    </div>
                    <!-- /.slide__back-row -->
                    <div class="back-row">
                      <span class="back__name">Вес:</span>
                      <p class="back__desc">{{ slide.weight }}</p>
                    </div>
                    <!-- /.slide__back-row -->
                    <div
                      v-html="richtext(slide.description)"
                      class="back-row"
                    ></div>
                    <!-- /.slide__back-row -->
                    <!-- <button class="btn slide__back-btn">Назад</button> -->
                    <!-- /.btn slide__back-btn -->
                  </div>
                  <!-- /.slide__back -->
                </div>
              </li>
            </template>
          </ul>

          <button aria-label="Previous" class="glider-prev">«</button>
          <button aria-label="Next" class="glider-next">»</button>
          <div role="tablist" class="glider-dots dots"></div>
        </div> */

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

  computed: {
    initialIndexSlider() {
      // console.log(
      //   'Math.round(this.story.slides.length): ',
      //   Math.round(this.story.slides.length)
      // );
      return Math.round(this.story.slides.length / 2);
    },
  },

  mounted() {
    useStoryblokBridge(this.story.id, (newStory) => (this.story = newStory));

    //* slider
    /* new Glider(document.querySelector('.glider'), {
      // `auto` allows automatic responsive
      // width calculations
      slidesToShow: '3',
      slidesToScroll: 'auto',

      // should have been named `itemMinWidth`
      // slides grow to fit the container viewport
      // ignored unless `slidesToShow` is set to `auto`
      // itemWidth: undefined,

      // if true, slides wont be resized to fit viewport
      // requires `itemWidth` to be set
      // * this may cause fractional slides
      exactWidth: false,

      // speed aggravator - higher is slower
      duration: 0.5,

      // dot container element or selector
      dots: '.dots',

      // arrow container elements or selector
      arrows: {
        prev: document.querySelector('.glider-prev'),
        // may also pass element directly
        next: document.querySelector('.glider-next'),
      },

      // allow mouse dragging
      draggable: true,
      // how much to scroll with each mouse delta
      dragVelocity: 3.3,

      // use any custom easing function
      // compatible with most easing plugins
      // eslint-disable-next-line object-shorthand
      easing: function (x, t, b, c, d) {
        return c * (t /= d) * t + b;
      },

      // event control
      scrollPropagate: false,
      eventPropagate: true,

      // Force centering slide after scroll event
      scrollLock: true,
      // how long to wait after scroll event before locking
      // if too low, it might interrupt normal scrolling
      scrollLockDelay: 150,

      // Force centering slide after resize event
      resizeLock: true,

      // Glider.js breakpoints are mobile-first
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 575,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }); */
  },
};
</script>

<style lang="scss" scoped>
.uk-dotnav {
  margin-top: 25px;

  display: flex;
  justify-content: center;
}

.slider-arrow {
  // .slider-arrow__item

  &__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:last-of-type {
      .slider-arrow__item-img {
        transform: rotate(180deg);
      }
    }
  }

  // .slider-arrow__item-img

  &__item-img {
    font-size: 25px;
    color: white;
  }
}

.karts {
  @extend %tpl-section;
  background: $redMy-900;

  // .karts__container

  &__container {
  }

  // .karts__title

  &__title {
    @extend %tpl-section-title;
    color: white;

    margin-bottom: 0.5em;
  }

  // .karts__content

  &__content {
  }

  // .karts__slider

  &__slider {
  }
}
.container {
}

div.glider-track {
  display: flex;
}
.glider-contain {
}
.slider {
  // .slider__list

  &__list {
    // display: flex;
    // gap: 20px;
    // padding: 20px 5px !important;
    // overflow-x: hidden;
  }

  // .slider__item

  &__item {
    max-width: 270px;
    margin: 5px 10px;
  }

  .glider-prev,
  .glider-next {
    color: white;
    top: 50%;
    transform: translateY(-50%);
  }

  .glider-prev {
  }
  .glider-next {
  }
  div.glider-dot.dots {
    & > button.glider-dot {
      background: inherit !important;
      color: inherit !important;
      opacity: 0.5 !important;

      &.active {
        background: inherit !important;
        color: inherit !important;
        opacity: 1 !important;
      }
    }
  }
}

.slide {
  background: $redMy-800;
  box-shadow: $shadowMy;

  // margin-left: 10px;
  // margin-right: 10px;

  /* &:first-of-type {
    margin-left: 0;
  }
  &:last-of-type {
    margin-right: 0;
  } */

  &:hover,
  &:focus {
    outline: 2px solid $orangeMy;
    outline-offset: 0px;
  }

  &:hover .slide__inner,
  &:focus .slide__inner {
    transform: rotateY(180deg);
  }

  &__inner {
    perspective: 1000px;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 600ms ease-in;
  }

  // .slide__front

  &__front {
    height: 100%;

    backface-visibility: hidden;
  }

  // .slide__front-img

  &__front-img {
    display: block;

    width: 100%;
    height: 350px;
    object-fit: cover;
  }

  // .slide__front-footer

  &__front-footer {
    padding: 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  // .slide__front-btn

  &__front-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 0.5em 1em;

    background: transparent;
    color: white;

    font-size: 16px;
    font-weight: 500;

    border: 1px solid currentColor;
  }

  // .slide__back

  &__back {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 1em;

    width: 100%;
    height: 100%;
    overflow-y: auto;

    backface-visibility: hidden;
    background: $redMy-800;

    transform: rotateY(180deg);

    // .slide__back-list

    &-list {
      display: grid;

      gap: 5px;
    }

    // .slide__back-item

    &-item {
    }

    // .slide__back-btn

    &-btn {
    }
  }
}
.back {
  // .back-row
  .back-row {
    display: flex;
    align-items: center;

    gap: 5px;

    &:last-of-type {
      margin-top: 10px;
    }
  }

  // .back__title

  &__title {
  }

  // .back__name

  &__name {
    font-weight: bold;
  }

  // .back__desc

  &__desc {
  }
}
</style>
