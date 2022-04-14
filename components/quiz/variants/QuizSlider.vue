<template>
  <div class="slider glide">
    <div data-glide-el="track" class="glide__track">
      <!--  -->
      <ul class="glide__slides slider__list flex gap-4 py-4">
        <li
          v-for="(slide, index) in getKartsOptions"
          :key="index"
          class="glide__slide slider__item slide rounded-md shadow overflow-hidden cursor-pointer"
          tabindex="-1"
          @click="setActiveSlideOption(slide, $event)"
        >
          <div class="slide__inner grid gap-3">
            <img
              :data-src="`${slide.kart_img.filename}/m/0x150`"
              :alt="slide.kart_img.alt"
              height="150"
              class="slide__front-img lazy w-full h-[150px] object-cover"
            />
            <div class="slide__front-footer p-4">
              <h3 class="slide__front-title">
                {{ slide.title }}
              </h3>
              <span v-if="slide.type"
                >Тип: <strong>{{ slide.type }}</strong></span
              >
            </div>
          </div>
          <!-- <pre>{{ slide }}</pre> -->
        </li>
      </ul>
    </div>
    <div class="glide__arrows" data-glide-el="controls">
      <button
        class="glide__arrow glide__arrow--left"
        data-glide-dir="<"
        aria-label="К предыдущему слайду"
      >
        <!-- <ion-icon
          :src="story.arrow_img.filename"
          :alt="story.arrow_img.alt"
          class="glide__arrow-img"
        ></ion-icon> -->
        <ion-icon class="glide__arrow-img" name="arrow-back-outline"></ion-icon>
      </button>
      <button
        class="glide__arrow glide__arrow--right"
        data-glide-dir=">"
        aria-label="К следующему слайду"
      >
        <ion-icon
          class="glide__arrow-img"
          name="arrow-forward-outline"
        ></ion-icon>
      </button>
    </div>
    <div class="glide__bullets" data-glide-el="controls[nav]">
      <button
        v-for="(_, index) in getKartsOptions"
        :key="index"
        class="glide__bullet"
        :data-glide-dir="`=${index}`"
        :aria-label="`К слайду номер ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LazyLoad from 'vanilla-lazyload';
import Glide, {
  Swipe,
  Breakpoints,
  Controls,
} from '@glidejs/glide/dist/glide.modular.esm';

const CLASS_OF_CARD = '.glide__slide';

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      selected: this.getCurDataOption,
    };
  },

  computed: {
    ...mapGetters(['getActiveIndex', 'getCurDataOption', 'getKartsOptions']),
  },

  watch: {
    /* selected(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$store.commit('changeChosenOptionOnActiveIndex', this.selected);
      }
    }, */
  },

  mounted() {
    //* lazyload of images
    // eslint-disable-next-line no-unused-vars
    const ll = new LazyLoad({});

    const glideEl = document.querySelector(
      `#step-${this.getActiveIndex} .glide`
    );

    // eslint-disable-next-line no-unused-vars
    const gl = new Glide(glideEl, {
      type: 'slider',
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

  methods: {
    setActiveSlideOption(option, $event) {
      const target = $event.target.closest(CLASS_OF_CARD);

      if (!target) {
        return;
      }

      // если type === 'slider-radio'
      if (this.type === 'slider-radio') {
        if (target.classList.contains('chosen')) {
          target.classList.remove('chosen');
          this.$store.commit('resetChosenOptionOnActiveIndex');
        } else {
          this.unselectChosenSlides();
          this.$store.commit('resetChosenOptionOnActiveIndex');
          target.classList.add('chosen');
          this.$store.commit('changeChosenOptionOnActiveIndex', option.title);
        }

        return;
      }

      // если type === 'slider-checkbox'
      if (this.type === 'slider-checkbox') {
        if (target.classList.contains('chosen')) {
          target.classList.remove('chosen');
          this.$store.commit('resetChosenOptionOnActiveIndex');
        } else {
          target.classList.add('chosen');
          this.$store.commit('changeChosenOptionOnActiveIndex', option.title);
        }
      }
    },

    unselectChosenSlides() {
      const wrapper = document.getElementById(`step-${this.getActiveIndex}`);

      const cardsEl = wrapper.querySelectorAll(CLASS_OF_CARD);

      cardsEl.forEach((cardEl) => cardEl.classList.remove('chosen'));
    },
  },
};
</script>

<style lang="scss" scoped>
.glide {
  position: relative;

  &__track {
    overflow-x: hidden;
    display: flex;

    padding: 0 10px;
  }

  // .glide__slides
  &__slides {
    list-style: none;
  }
  // .glide__slide
  &__slide {
    margin: 0 !important;

    &.chosen {
      outline: 4px solid $yellowMy;
    }
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
    // left: -5%;

    transform: translate(0%, -50%);

    background: $redMy-50;
    border-radius: 50%;

    @include mq(med) {
      top: 50%;
    }

    // .glide__arrow-img

    &-img {
      font-size: var(--fz-arrow);
      color: black !important;

      path {
      }
    }

    // .glide__arrow--left

    &--left {
    }

    // .glide__arrow--right

    &--right {
      left: unset;
      right: 0;

      // transform: translate(0%, -50%) rotate(180deg);
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

    background: mix($greyMy, $orangeMy, 75%);
    opacity: 0.4;
    transition: all 0.05s ease-in;

    &--active {
      background: $orangeMy;
      opacity: 0.8;
      transition: all 0.2s ease-in;
    }
  }
}
</style>
