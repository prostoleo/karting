<template>
  <section v-editable="story" class="cta-section">
    <div class="container cta-section__container">
      <div class="cta-section__content content">
        <h2 class="content__title">{{ story.title }}</h2>
        <!-- /.content__title -->
        <form class="content__form form" @submit.prevent="submitForm">
          <div class="form__inputs">
            <div class="form__row">
              <input
                id="input-name"
                v-model.trim="formData.name.value"
                type="text"
                class="form__row-input"
                :class="{ active: formData.name.value.length > 0 }"
                @blur="validateInput('name', $event)"
              />
              <label for="input-name" class="form__row-label">Ваше имя</label>
              <small v-if="isErrorNameShown" class="form__row-small"
                >Это поле является обязательным!</small
              >
              <!-- /.form__row-label -->
            </div>
            <!-- /.form__row -->
            <div class="form__row">
              <input
                id="input-phone"
                v-model.trim="formData.phone.value"
                type="text"
                class="form__row-input tel"
                :class="{ active: formData.phone.value.length > 0 }"
                @blur="validateInput('phone', $event)"
              /><label for="input-phone" class="form__row-label"
                >Ваш телефон</label
              >
              <!-- /.form__row-label -->
              <small v-if="isErrorPhoneShown" class="form__row-small"
                >Укажите, пожалуйста, свой номер телефона</small
              >
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
          loading="lazy"
        />
      </div>
      <!-- /.cta-section__bg -->
    </div>
    <!-- /.container cta-section__container -->
    <!-- <b-notification
      v-model="successMsgActive"
      type="is-danger"
      aria-close-label="Закрыть уведомление"
      role="alert"
      position="is-top"
      :duration="3500"
      class="!fixed -translate-x-1/2 top-1 max-w-sm !bg-emerald-400 z-[1000]"
      style="left: calc(50% - 192px)"
    >
      Сообщение успешно отправлено! 🚀. Мы свяжемся с Вами в ближайшее время.
    </b-notification>
    <b-notification
      v-model="errorMsgActive"
      type="is-danger"
      aria-close-label="Закрыть уведомление"
      role="alert"
      position="is-top"
      :duration="5000"
      class="!fixed -translate-x-1/2 top-1 max-w-sm !bg-red-500 z-[1000]"
      style="left: calc(50% - 192px)"
    >
      Не удалось отправить сообщение. 😞 Попробуйте позже.
    </b-notification> -->
  </section>
  <!-- /.cta-section -->
</template>

<script>
// import { NotificationProgrammatic as Notification } from 'buefy';
// import 'buefy/dist/buefy.min.css';

import { useStoryblokBridge } from '@storyblok/nuxt';
import { richtext } from '~/utils/storyblok/storyblok.js';

import { SendMail } from '@/assets/sendMail/sendMail';

// const inputsArr = ['name', 'phone'];

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
      isLoading: false,
      formData: {
        name: {
          value: '',
          touched: false,
          error: true,
        },
        phone: {
          value: '',
          touched: false,
          error: true,
        },
      },
      totalError: false,
      successMsgActive: false,
      errorMsgActive: false,
    };
  },
  computed: {
    isErrorNameShown() {
      // console.log(
      //   'this.formData.name.touched && this.formData.name.error: ',
      //   this.formData.name.touched && this.formData.name.error
      // );
      return this.formData.name.touched && this.formData.name.error;
    },
    isErrorPhoneShown() {
      // console.log(
      //   'this.formData.phone.touched && this.formData.phone.error: ',
      //   this.formData.phone.touched && this.formData.phone.error
      // );
      return this.formData.phone.touched && this.formData.phone.error;
    },
    isTotalError() {
      const isError = Object.values(this.formData).some((val) => {
        // console.log('val: ', val);
        return val.error === true;
      });
      // console.log('isError: ', isError);
      return isError;
    },
  },
  mounted() {
    useStoryblokBridge(this.story._uid, (newStory) => (this.story = newStory));
  },
  methods: {
    validateInput(type, $event) {
      if (type === 'name') {
        if (this.formData.name.value.length > 0) {
          this.formData.name.error = false;
        } else {
          this.formData.name.error = true;
        }
        this.formData.name.touched = true;
        return;
      }
      if (type === 'phone') {
        if (this.formData.phone.value.length === 18) {
          this.formData.phone.error = false;
        } else {
          this.formData.phone.error = true;
        }
        this.formData.phone.touched = true;
      }
    },
    async submitForm() {
      try {
        /* if (this.formData.name.error || this.formData.phone.error) {
                return;
              } */
        if (this.isTotalError) {
          return;
        }
        const dataToSubmit = {
          name: this.formData.name.value,
          phone: this.formData.phone.value,
        };
        console.log('dataToSubmit: ', dataToSubmit);
        const start = parseInt(new Date());

        this.$nuxt.$loading.start();
        const response = await SendMail(dataToSubmit);
        console.log('response: ', response);
        this.$nuxt.$loading.finish();

        const end = parseInt(new Date());

        const diff = Math.round((end - start) / 1000);
        // console.log('diff: ', diff);

        if (diff >= 15) {
          throw new Error(' превышено время на запрос');
        }

        if (response.toLowerCase() !== 'ok') {
          throw new Error(
            'произошла какая-то ошибка, попробуйте повторить позже'
          );
        }

        this.successMsg();
        /* this.successMsgActive = true;
        setTimeout(() => {
          this.successMsgActive = false;
        }, 3500); */
        this.formData.name.value = this.formData.phone.value = '';
      } catch (error) {
        console.warn(`💣💣💣, произошла ошибка ${error?.message ?? error}`);
        this.$nuxt.$loading.finish();
        this.errorMsg();
        /* this.errorMsgActive = true;
        setTimeout(() => {
          this.errorMsgActive = false;
        }, 3500); */
        this.formData.name.value = this.formData.phone.value = '';
      }
    },

    successMsg() {
      this.$buefy.notification.open({
        message: 'Сообщение успешно отправлено! 🚀',
        type: 'is-success',
        // pauseOnHover: true,
        position: 'is-top',
        duration: 3500,
      });
    },

    errorMsg() {
      this.$buefy.notification.open({
        duration: 5000,
        message: `Не удалось отправить сообщение. 😞 Попробуйте позже.`,
        position: 'is-top',
        type: 'is-danger',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.cta-section {
  background: $gradientMy;
  @extend %tpl-section;

  --section-pt: 20px;
  --section-pb: 120px;

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
      width: 180px;
    }
    @include mq(xl) {
      // width: 180px;

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
  gap: 2rem;

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
    &:hover,
    &.active {
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

  // .form__row-small
  &__row-small {
    position: absolute;
    left: var(--input-px);
    top: calc(var(--input-py) * 3);
    margin-top: 5px;

    font-size: 12px;
    font-weight: 500;
    color: $redMy-500;
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
