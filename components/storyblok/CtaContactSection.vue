<template>
  <section v-editable="story" class="cta-section">
    <div class="container cta-section__container">
      <div class="cta-section__content content">
        <h2 class="content__title">{{ story.title }}</h2>
        <!-- /.content__title -->
        <form class="content__form form">
          <div class="form__inputs">
            <div class="form__row">
              <input id="input-name" type="text" class="form__row-input" />
              <label for="input-name" class="form__row-label">Ваше имя</label>
              <!-- /.form__row-label -->
            </div>
            <!-- /.form__row -->
            <div class="form__row">
              <input
                id="input-phone"
                type="text"
                class="form__row-input"
              /><label for="input-phone" class="form__row-label"
                >Ваш телефон</label
              >
              <!-- /.form__row-label -->
            </div>
            <!-- /.form__row -->
          </div>
          <!-- /.form__inputs -->
          <BaseCtaButton class="form__submit btn"
            >{{ story.btn_text }}
          </BaseCtaButton>
          <!-- /.form__submit btn -->
        </form>
        <!-- /.content__form form -->
      </div>
      <!-- /.cta-section__content content -->
      <div class="cta-section__bg">
        <img
          :src="`${story.kart_image.filename}`"
          :alt="story.kart_image.alt"
          class="cta-section__bg-img"
        />
      </div>
      <!-- /.cta-section__bg -->
    </div>
    <!-- /.container cta-section__container -->
  </section>
  <!-- /.cta-section -->
</template>

<script>
import { useStoryblokBridge } from '@storyblok/nuxt';
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
  },
};
</script>

<style lang="scss" scoped>
.cta-section {
  background: $gradientMy;
  @extend %tpl-section;

  --section-pt: 20px;
  --section-pb: 120px;

  // ! потом убрать
  outline: 1px solid white;

  position: relative;
  overflow: hidden;

  @include mq(2xl) {
    --section-pb: 80px;
  }

  // .cta-section__container

  &__container {
    position: relative;
  }

  // .cta-section__content

  &__content {
  }

  // .cta-section__bg

  &__bg {
    // display: none;
    --section-pb-minus: calc(var(--section-pb) / -1);

    position: absolute;
    // top: 1rem;
    bottom: calc(var(--section-pb-minus) + 1rem);
    right: 0;

    max-width: 100%;
    width: 130px;

    @include mq(lg) {
      width: 150px;
    }
    @include mq(xl) {
      width: 180px;

      bottom: unset;
      right: unset;
      left: -2.75vw;
      top: 50%;

      transform: translate(0, -1rem) scaleX(-1);
    }

    @include mq(2xl) {
      width: 220px;
      left: -3.5vw;

      top: 30%;
    }
    @include mq(3xl) {
      width: 250px;
      left: -180px;
    }

    // .cta-section__bg-img

    &-img {
      object-fit: cover;
      width: 100%;
      height: 100%;

      transform: scaleX(-1);

      opacity: 0.7;
    }
  }
}
.content {
  // .content__title

  &__title {
    @extend %tpl-section-title;
    margin-bottom: 1em;
  }

  // .content__form

  &__form {
  }
}
.form {
  display: grid;
  gap: 1rem;

  --input-px: 10px;
  --input-py: 15px;
  --font-size: 14px;

  @include mq(lg) {
    grid-auto-flow: column;

    margin: 0 auto;
    width: fit-content;
  }

  // .form__inputs

  &__inputs {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(120px, 1fr);

    gap: 0.5rem;

    @include mq(lg) {
      grid-auto-columns: minmax(220px, 1fr);
    }
    @include mq(xl) {
      grid-auto-columns: minmax(275px, 1fr);
    }

    @include mq(2xl) {
      grid-auto-columns: minmax(300px, 1fr);
    }
  }

  // .form__row

  &__row {
    position: relative;

    width: 100%;
  }

  // .form__row-input

  &__row-input {
    // max-width: 100%;
    width: 100%;

    padding: var(--input-py) var(--input-px);

    font-size: var(--font-size);
    line-height: 1;

    color: white;

    background: transparent;
    border: 1px solid white;

    &:focus,
    &:hover {
      & ~ label {
        transform: translate(
          calc(var(--input-px) * -1),
          calc(var(--input-py) * -3)
        );
      }
    }
  }

  // .form__row-label

  &__row-label {
    position: absolute;
    left: var(--input-px);
    // top: var(--input-py);
    top: 50%;

    font-size: var(--font-size);
    line-height: 1;

    transform: translate(0, calc(var(--font-size) / -2));

    color: white;
    opacity: 0.8;

    pointer-events: none;

    transition: transform 150ms ease-in;
  }

  // .form__submit

  &__submit {
    background: $redMy-500;
    justify-self: flex-start;

    // display: block;
  }
}
.btn {
}
</style>
