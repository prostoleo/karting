<template>
  <form class="form" @submit.prevent="submitForm">
    <h4>Заполните форму, чтобы мы могли связаться с Вами</h4>
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
        /><label for="input-phone" class="form__row-label">Ваш телефон</label>
        <!-- /.form__row-label -->
        <small v-if="isErrorPhoneShown" class="form__row-small"
          >Укажите, пожалуйста, свой номер телефона</small
        >
      </div>
      <!-- /.form__row -->
    </div>
    <!-- /.form__inputs -->
    <QuizNextBtn class="" @btn-click="submitForm"> Отправить </QuizNextBtn>
    <!-- /.form__submit btn -->
  </form>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { SendQuiz } from '@/assets/sendMail/sendMail';

export default {
  data() {
    return {
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
    };
  },

  totalError: false,
  successMsgActive: false,
  errorMsgActive: false,

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
    // eslint-disable-next-line require-await
    async submitForm() {
      const data = this.$store.getters.getDataForQuizSubmit;
      console.log('data: ', data);

      if (!data) {
        this.$buefy.notification.open({
          duration: 5000,
          message: 'Упс, произошла ошибка 😞. Попробуйте позже',
          position: 'is-top',
          type: 'is-danger',
        });

        return;
      }

      if (this.isTotalError) {
        this.$buefy.notification.open({
          duration: 5000,
          message: 'Некоторые поля в форме заполнены неверно',
          position: 'is-top',
          type: 'is-danger',
        });
        // eslint-disable-next-line no-useless-return
        return;
      }

      try {
        // if (this.formData.name.error || this.formData.phone.error) {
        //         return;
        //       }

        const dataToSubmit = {
          data,
          name: this.formData.name.value,
          contact: this.formData.phone.value,
        };
        console.log('dataToSubmit: ', dataToSubmit);
        const start = parseInt(new Date());

        this.$nuxt.$loading.start();
        const response = await SendQuiz(dataToSubmit);
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
        // this.successMsgActive = true;
        // setTimeout(() => {
        //   this.successMsgActive = false;
        // }, 3500);
        this.formData.name.value = this.formData.phone.value = '';
      } catch (error) {
        console.warn(`💣💣💣, произошла ошибка ${error?.message ?? error}`);
        this.$nuxt.$loading.finish();
        this.errorMsg();
        // this.errorMsgActive = true;
        // setTimeout(() => {
        //   this.errorMsgActive = false;
        // }, 3500);
        this.formData.name.value = this.formData.phone.value = '';
      }
    },
    successMsg() {
      this.$buefy.notification.open({
        message:
          'Данные успешно отправлены! 🚀 Мы свяжемся с Вами как можно скорее',
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
.form {
  display: grid;
  gap: 2rem;
  justify-content: center;

  --input-px: 10px;
  --input-py: 15px;
  --font-size: 14px;

  @include mq(lg) {
    // grid-auto-flow: column;

    // margin: 0 auto;
    // width: fit-content;
  }

  // .form__inputs

  &__inputs {
    display: grid;
    gap: 1.5rem;
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

    color: black;

    background: transparent;
    border: 1px solid $greyMy;

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

    color: $greyMy;
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
    // background: $redMy-500;
    // justify-self: flex-start;

    // display: block;
  }
}
</style>
