<template>
  <section
    id="karts"
    v-editable="story"
    class="karts"
    :style="`background-image: url(${story.bg_img.filename}/m/80x0); background-repeat: repeat; background-size: 80px auto; background-blend-mode: screen`"
  >
    <div class="container karts__container">
      <h2 class="karts__title">{{ story.title }}</h2>
      <!-- /.karts__title -->

      <div class="karts__content">
        <div class="slider glide">
          <div data-glide-el="track" class="glide__track">
            <!--  -->
            <ul class="glide__slides slider__list">
              <li
                v-for="slide in story.slides"
                :key="slide._uid"
                class="glide__slide slider__item slide"
                tabindex="-1"
              >
                <div class="slide__inner">
                  <div class="slide__front">
                    <img
                      :data-src="`${slide.kart_img.filename}/m/0x250`"
                      :alt="slide.kart_img.alt"
                      height="250"
                      class="slide__front-img lazy"
                      loading="lazy"
                    />
                    <div class="slide__front-footer">
                      <h3 class="slide__front-title">
                        {{ slide.title }}
                      </h3>
                    </div>
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
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button
              class="glide__arrow glide__arrow--left"
              data-glide-dir="<"
              aria-label="К предыдущему слайду"
            >
              <ion-icon
                :src="story.arrow_img.filename"
                :alt="story.arrow_img.alt"
                class="glide__arrow-img"
              ></ion-icon>
            </button>
            <button
              class="glide__arrow glide__arrow--right"
              data-glide-dir=">"
              aria-label="К следующему слайду"
            >
              <ion-icon
                :src="story.arrow_img.filename"
                :alt="story.arrow_img.alt"
                class="glide__arrow-img"
              ></ion-icon>
            </button>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            <button
              v-for="(_, index) in story.slides"
              :key="index"
              class="glide__bullet"
              :data-glide-dir="`=${index}`"
              :aria-label="`К слайду номер ${index + 1}`"
            ></button>
          </div>
        </div>
      </div>
      <!-- /.karts__content -->
    </div>
    <!-- /.container karts__container -->
  </section>
</template>

<script>
/* eslint-disable no-unused-vars */
/* <div class="karts__content">
        <div uk-slider>
          <div class="uk-position-relative">
            <div class="uk-slider-container uk-light">
              <!--  -->
              <!-- uk-child-width-1-4@m  -->
              <ul
                class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m uk-slider-items"
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
                          :src="`${slide.kart_img.filename}/m/0x350`"
                          :alt="slide.kart_img.alt"
                          class="slide__front-img"
                          loading="lazy"
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
                aria-label="К предыдущему слайду"
              ></a>
              <a
                class="uk-position-center-right uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
                aria-label="К следующему слайду"
              ></a>
            </div>

            <div class="uk-visible@s">
              <a
                class="uk-position-center-left-out uk-position-small"
                href="#"
                uk-slidenav-previous
                uk-slider-item="previous"
                aria-label="К предыдущему слайду"
              ></a>
              <a
                class="uk-position-center-right-out uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
                aria-label="К следующему слайду"
              ></a>
            </div>
          </div>

          <ul class="uk-slider-nav uk-dotnav uk-flex-center"></ul>
        </div>
      </div> */

/* <!-- <div class="karts__content">
        <div uk-slider>
          <div class="uk-position-relative">
            <div class="uk-slider-container uk-light">
              <!-- uk-child-width-1-4@m  -->
              <ul
                class="uk-child-width-expand uk-child-width-1-2@s uk-child-width-1-3@m uk-slider-items"
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
                          :src="`${slide.kart_img.filename}/m/270x350`"
                          :alt="slide.kart_img.alt"
                          width="270"
                          height="350"
                          class="slide__front-img"
                          loading="lazy"
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
                aria-label="К предыдущему слайду"
              ></a>
              <a
                class="uk-position-center-right uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
                aria-label="К следующему слайду"
              ></a>
            </div>

            <div class="uk-visible@s">
              <a
                class="uk-position-center-left-out uk-position-small"
                href="#"
                uk-slidenav-previous
                uk-slider-item="previous"
                aria-label="К предыдущему слайду"
              ></a>
              <a
                class="uk-position-center-right-out uk-position-small"
                href="#"
                uk-slidenav-next
                uk-slider-item="next"
                aria-label="К следующему слайду"
              ></a>
            </div>
          </div>

          <ul class="uk-slider-nav uk-dotnav uk-flex-center"></ul>
        </div>
      </div> -->
      <!-- /.karts__content --> */

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

/* <div class="glide slider">
          <div data-glide-el="track" class="glide__track">
            <!--  -->
            <ul class="glide__slides slider__list">
              <li
                v-for="slide in story.slides"
                :key="slide._uid"
                class="glide__slide slider__item slide"
                tabindex="-1"
              >
                <div class="slide__inner">
                  <div class="slide__front">
                    <img
                      :src="`${slide.kart_img.filename}/m/270x350`"
                      :alt="slide.kart_img.alt"
                      width="270"
                      height="350"
                      class="slide__front-img"
                      loading="lazy"
                    />
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
            </ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
            <button class="glide__arrow glide__arrow--left" data-glide-dir="<">
              <ion-icon
                :src="slide.arrow_img.filename"
                :alt="slide.arrow_img.alt"
                class="glide__arrow-img"
              ></ion-icon>
            </button>
            <button class="glide__arrow glide__arrow--right" data-glide-dir=">">
              <ion-icon
                :src="slide.arrow_img.filename"
                :alt="slide.arrow_img.alt"
                class="glide__arrow-img"
              ></ion-icon>
            </button>
          </div>
          <div class="glide__bullets" data-glide-el="controls[nav]">
            <button
              v-for="(_, index) in story.slides"
              :key="index"
              class="glide__bullet"
              :data-glide-dir="`=${index}`"
            ></button>
          </div>
        </div> */
import LazyLoad from 'vanilla-lazyload';

// eslint-disable-next-line no-unused-vars
import Glide, {
  Swipe,
  Breakpoints,
  Controls,
} from '@glidejs/glide/dist/glide.modular.esm';

/* eslint-disable no-new */
import { useStoryblokBridge } from '@storyblok/nuxt';

// import Glider from 'glider-js/glider';
// import 'glider-js/glider.min.css';
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

    //* lazyload of images
    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({
      /* callback_enter: this.callback_enter,
      callback_exit: this.callback_exit,
      callback_cancel: this.callback_cancel,
      callback_loading: this.callback_loading,
      callback_loaded: this.callback_loaded,
      callback_error: this.callback_error,
      callback_finish: this.callback_finish, */
    });

    // console.log('document: ', document);
    const glideEl = document.querySelector('.glide');
    // console.log('glideEl: ', glideEl);

    // eslint-disable-next-line no-unused-vars
    const gl = new Glide(glideEl, {
      type: 'carousel',
      perView: 3,
      focusAt: 'center',
      startAt: 3,
      // gap: 20,

      breakpoints: {
        550: {
          perView: 1,
        },
        768: {
          perView: 2,
        },
      },
    }).mount({ Controls, Breakpoints, Swipe });
  },

  /* logElementEvent(eventName, element) {
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
    element.src = 'https://via.placeholder.com/440x560/?text=Error+Placeholder';
  },
  callback_finish() {
    this.logElementEvent('✔️ FINISHED', document.documentElement);
  },
  callback_cancel(element) {
    this.logElementEvent('🔥 CANCEL', element);
  }, */
};
</script>

<style lang="scss" scoped>
/* .uk-dotnav {
  margin-top: 25px;

  display: flex;
  justify-content: center;
} */

.glide {
  position: relative;

  &__track {
    overflow-x: hidden;
    display: flex;

    padding: 0 10px;
  }

  // .glide__slides
  &__slides {
  }
  // .glide__slide
  &__slide {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  // .glide__arrows

  &__arrows {
  }

  // .glide__arrow

  &__arrow {
    --w-arrow: 50px;
    --p-arrow: 10px;
    --fz-arrow: calc(var(--w-arrow) - var(--p-arrow));

    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: var(--p-arrow);

    position: absolute;
    top: 100%;
    left: -5%;

    transform: translate(0%, -50%);

    background: transparent;

    @include mq(med) {
      top: 50%;
    }

    // .glide__arrow-img

    &-img {
      font-size: var(--fz-arrow);
      color: white;
    }

    // .glide__arrow--left

    &--left {
    }

    // .glide__arrow--right

    &--right {
      left: unset;
      right: -5%;

      transform: translate(0%, -50%) rotate(180deg);
    }
  }
  --bullet-w: 15px;

  &__bullets {
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  &__bullet {
    width: var(--bullet-w);
    height: var(--bullet-w);

    border-radius: 50%;

    background: white;
    opacity: 0.5;
    transition: opacity 0.05s ease-in;

    &--active {
      opacity: 1;
      transition: opacity 0.2s ease-in;
    }
  }
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

.glide {
}

.slider {
  // .slider__list

  &__list {
    // display: flex;
    // gap: 20px;
    // padding: 20px 5px !important;
    // overflow-x: hidden;

    display: flex;
    gap: 10px;
  }

  // .slider__item

  &__item {
    width: 100%;
    // max-width: 270px;
    // margin: 5px 10px;
  }
}

.slide {
  background: $redMy-800;
  box-shadow: $shadowMy;
  margin: 20px 0;

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
    height: 100%;

    position: relative;
    perspective: 1000px;
    transform-style: preserve-3d;
    transition: transform 600ms ease-in;
  }

  // .slide__front

  &__front {
    height: 100%;

    backface-visibility: hidden;

    display: grid;
    grid-template-rows: 1fr auto;
  }

  // .slide__front-img

  &__front-img {
    display: block;

    width: 100%;
    height: 100%;
    // height: 350px;
    object-fit: cover;
  }

  // .slide__front-footer

  &__front-footer {
    padding: 2.25rem 1rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  // .slide__front-title

  &__front-title {
    font-size: 16px;
    font-weight: 700;

    color: white;

    text-align: center;
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

    color: white;

    transform: rotateY(180deg);

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      background: var(--scroll-bar-bg-color, #fef);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--scroll-bar-color, lightgrey);
      border-radius: 20px;
      border: 3px solid var(--scroll-bar-bg-color, gray);
    }

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
